package org.csid.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface ISettingsService {

    /**
     * Stores a image
     * @param file
     * @param idUser
     */
    void store(MultipartFile file, Long idUser) throws Exception;

    /**
     * Returns File in String
     * @param idUser
     * @return String
     */
    String getFile(final Long idUser);

}
