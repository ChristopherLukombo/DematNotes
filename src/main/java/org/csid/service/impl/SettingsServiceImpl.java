package org.csid.service.impl;

import com.jcraft.jsch.*;
import org.csid.domain.User;
import org.csid.domain.non.persistant.UserSFTP;
import org.csid.repository.UserRepository;
import org.csid.service.ISettingsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service("ISettingsService")
public class SettingsServiceImpl implements ISettingsService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SettingsServiceImpl.class);

    @Value("${path.upload}")
    private String path;

    @Value("${base.url.file}")
    private String baseUrlFile;

    @Value("${sftp.host}")
    private String sftpHost;

    @Value("${sftp.port}")
    private String sftpPort;

    @Value("${sftp.user}")
    private String sftpUser;

    @Value("${sftp.pass}")
    private String sftpPass;


    @Autowired
    private UserRepository userRepository;

    private static ChannelSftp channelSftp = null;
    private static Session session = null;
    private static Channel channel = null;

    /**
     * Stores a image
     *
     * @param file
     * @param idUser
     */
    @Override
    public void store(MultipartFile file, Long idUser) throws Exception {
        UserSFTP userSFTP = new UserSFTP();
        userSFTP.setUsername(sftpUser);
        userSFTP.setPassword(sftpPass);
        userSFTP.setPort(Integer.parseInt(sftpPort));
        userSFTP.setServer(sftpHost);

        final Path rootLocation = Paths.get(path + "/settings/" + idUser);

        if (!new File(rootLocation + "").exists()) {
            new File(rootLocation + "").mkdirs();
        }

        final File fileTmp = new File(rootLocation + "/" + file.getOriginalFilename());

        if (fileTmp.exists()) {
            FileSystemUtils.deleteRecursively(fileTmp);
//            fileTmp.delete();
        }

        try {
            Files.copy(file.getInputStream(), rootLocation.resolve(file.getOriginalFilename()));

            final User user = userRepository.findOne(idUser);
            user.setImageUrl(this.baseUrlFile + idUser + "/" + file.getOriginalFilename());
            this.userRepository.saveAndFlush(user);
        } catch (Exception e) {
            throw new RuntimeException("FAIL!");
        }

        String SFTPHOST = userSFTP.getServer(); // SFTP Host Name or SFTP Host IP Address
        int SFTPPORT = userSFTP.getPort(); // SFTP Port Number
        String SFTPUSER = userSFTP.getUsername(); // User Name
        String SFTPPASS = userSFTP.getPassword(); // Password

        String SFTPWORKINGDIR = "/var/www/html/settings"; // Source Directory on SFTP server
        String LOCALDIRECTORY = path + "/settings/" + idUser; // Local Target Directory

        try {
            JSch jsch = new JSch();
            session = jsch.getSession(SFTPUSER, SFTPHOST, SFTPPORT);
            session.setPassword(SFTPPASS);
            java.util.Properties config = new java.util.Properties();
            config.put("StrictHostKeyChecking", "no");
            session.setConfig(config);
            session.connect(); // Create SFTP Session
            channel = session.openChannel("sftp"); // Open SFTP Channel
            channel.connect();
            channelSftp = (ChannelSftp) channel;
            channelSftp.cd(SFTPWORKINGDIR); // Change Directory on SFTP Server

            SftpATTRS attrs = null;

            try {
                attrs = channelSftp.stat("" + idUser);
            } catch (Exception e) {
                System.out.println(" not found");
            }

            if (attrs != null) {
                System.out.println("Directory exists IsDir=" + attrs.isDir());
            } else {
                System.out.println("Creating dir " + "" + idUser);
                channelSftp.mkdir("" + idUser);
            }

            recursiveFolderUpload(LOCALDIRECTORY, SFTPWORKINGDIR);

        } catch (Exception ex) {
            LOGGER.error("Error during connexion " + ex.getMessage());
            throw new Exception("Error during sending");
        } finally {
            if (channelSftp != null)
                channelSftp.disconnect();
            if (channel != null)
                channel.disconnect();
            if (session != null)
                session.disconnect();

        }

    }

    private void recursiveFolderUpload(String sourcePath, String destinationPath) throws SftpException, FileNotFoundException {
        File sourceFile = new File(sourcePath);
        if (sourceFile.isFile()) {

            // copy if it is a file
            channelSftp.cd(destinationPath);
            if (!sourceFile.getName().startsWith("."))
                channelSftp.put(new FileInputStream(sourceFile), sourceFile.getName(), ChannelSftp.OVERWRITE);

        } else {

            System.out.println("inside else " + sourceFile.getName());
            File[] files = sourceFile.listFiles();

            if (files != null && !sourceFile.getName().startsWith(".")) {

                channelSftp.cd(destinationPath);
                SftpATTRS attrs = null;

                // check if the directory is already existing
                try {
                    attrs = channelSftp.stat(destinationPath + "/" + sourceFile.getName());
                } catch (Exception e) {
                    System.out.println(destinationPath + "/" + sourceFile.getName() + " not found");
                }

                // else create a directory
                if (attrs != null) {
                    System.out.println("Directory exists IsDir=" + attrs.isDir());
                } else {
                    System.out.println("Creating dir " + sourceFile.getName());
                    channelSftp.mkdir(sourceFile.getName());
                }

                for (File f : files) {
                    recursiveFolderUpload(f.getAbsolutePath(), destinationPath + "/" + sourceFile.getName());
                }

            }
        }

    }

    /**
     * Returns File in String
     *
     * @param idUser
     * @return String
     */
    @Override
    public String getFile(Long idUser) {
        final User user = userRepository.findOne(idUser);
        return user.getImageUrl();
    }
}
