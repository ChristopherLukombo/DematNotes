package org.csid.service;

import org.springframework.stereotype.Service;

import java.io.File;
import java.time.LocalDate;

@Service
public interface ISchoolReportService {

    /**
     * Generate School Report in pdf and return it
     * @return File : School Report Generated
     */
    File generateSchoolReport(Long idUser, LocalDate dateInscription);

}
