package org.csid.web.rest;

import org.csid.service.ISettingsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class SettingsController {

    private static final Logger LOGGER = LoggerFactory.getLogger(SchoolReportController.class);

    @Autowired
    private ISettingsService settingsService;


    @RequestMapping(value = "/setting/upload/{idUser}", method = RequestMethod.POST)
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @PathVariable("idUser") Long idUser) {
        LOGGER.info("Call API service store ...");

        final String message;
        try {
            this.settingsService.store(file, idUser);
            message = "Successfully uploaded " + file.getOriginalFilename() + "!";
        } catch (Exception e) {
            throw new RuntimeException(HttpStatus.INTERNAL_SERVER_ERROR + " FAIL to upload " + file.getOriginalFilename() + "!" + e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.OK).body(message);
    }

    @RequestMapping(value = "/setting/getImage/{idUser}", method = RequestMethod.GET)
    public ResponseEntity<String> getImage(@PathVariable("idUser")  final Long idUser) throws Exception {
        LOGGER.info("Call API Service getFile");

        String image;
        try {
            image = settingsService.getFile(idUser);
        } catch (Exception e) {
            LOGGER.error("Error during file getting : " + e.getMessage());
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during file getting");
        }

        if (image == null) {
            LOGGER.info("Call API getImage : No content !");
            throw new Exception(HttpStatus.NOT_FOUND.value() + " No content !");
        }


        return new ResponseEntity<>(image, HttpStatus.OK);
    }
}
