package org.csid.service;

import org.csid.service.dto.ResultsDTO;
import org.springframework.stereotype.Service;

@Service
public interface ResultsService {

    /**
     * Return the results of a student according to id
     * @param idUser to search
     * @return the list of entities
     */
    ResultsDTO getResults(final Long idUser) throws Exception;
}
