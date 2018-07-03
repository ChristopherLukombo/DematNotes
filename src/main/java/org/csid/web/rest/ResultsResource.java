package org.csid.web.rest;

import org.csid.service.ResultsService;
import org.csid.service.dto.ResultsDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ResultsResource {

    private static final Logger LOGGER = LoggerFactory.getLogger(ResultsResource.class);

    @Autowired
    private ResultsService resultsService;


    /**
     * Return the results of a student according to id
     *
     * @param idUser to search
     * @return the list of entities
     */
    @RequestMapping(value = "/results/student/{idUser}", method = RequestMethod.GET)
    public ResponseEntity<ResultsDTO> getResults(@PathVariable final Long idUser) throws Exception {
        LOGGER.info("Call API service getResults ...");

        ResultsDTO results;

        try {
            results = resultsService.getResults(idUser);
        } catch (Exception e) {
            LOGGER.error("Error during results collecting : " + e.getMessage());
            throw new Exception(HttpStatus.INTERNAL_SERVER_ERROR.value() + " Error during results collecting");
        }

        return new ResponseEntity<>(results, HttpStatus.OK);
    }
}
