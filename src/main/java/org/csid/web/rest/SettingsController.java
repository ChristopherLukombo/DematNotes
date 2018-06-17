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
    @Autowired
    private ISettingsService settingsService;

    private final Logger log = LoggerFactory.getLogger(SchoolReportController.class);

    @RequestMapping(value = "/setting/upload/{idUser}", method = RequestMethod.POST)
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @PathVariable("idUser") Long idUser) {
        final String message;

        try {
            this.settingsService.store(file, idUser);
            message = "You successfully uploaded " + file.getOriginalFilename() + "!";
        } catch (Exception e) {
            throw new RuntimeException(HttpStatus.INTERNAL_SERVER_ERROR + " FAIL to upload " + file.getOriginalFilename() + "!" + e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.OK).body(message);
    }

    @RequestMapping(value = "/setting/getImage/{idUser}", method = RequestMethod.GET)
    public String getImage(@PathVariable("idUser")  final Long idUser) {
        log.info("[API] Call API Service getImage");
        return settingsService.getFile(idUser);
    }
}
