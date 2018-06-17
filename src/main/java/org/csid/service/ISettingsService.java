package org.csid.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface ISettingsService {

    void store(MultipartFile file, Long idUser);

    String getFile(final Long idUser);

}
