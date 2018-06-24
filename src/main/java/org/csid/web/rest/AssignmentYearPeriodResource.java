package org.csid.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.csid.service.AssignmentYearPeriodService;
import org.csid.web.rest.errors.BadRequestAlertException;
import org.csid.web.rest.util.HeaderUtil;
import org.csid.service.dto.AssignmentYearPeriodDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AssignmentYearPeriod.
 */
@RestController
@RequestMapping("/api")
public class AssignmentYearPeriodResource {

    private final Logger log = LoggerFactory.getLogger(AssignmentYearPeriodResource.class);

    private static final String ENTITY_NAME = "assignmentYearPeriod";

    private final AssignmentYearPeriodService assignmentYearPeriodService;

    public AssignmentYearPeriodResource(AssignmentYearPeriodService assignmentYearPeriodService) {
        this.assignmentYearPeriodService = assignmentYearPeriodService;
    }

    /**
     * POST  /assignment-year-periods : Create a new assignmentYearPeriod.
     *
     * @param assignmentYearPeriodDTO the assignmentYearPeriodDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new assignmentYearPeriodDTO, or with status 400 (Bad Request) if the assignmentYearPeriod has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/assignment-year-periods")
    @Timed
    public ResponseEntity<AssignmentYearPeriodDTO> createAssignmentYearPeriod(@RequestBody AssignmentYearPeriodDTO assignmentYearPeriodDTO) throws URISyntaxException {
        log.debug("REST request to save AssignmentYearPeriod : {}", assignmentYearPeriodDTO);
        if (assignmentYearPeriodDTO.getId() != null) {
            throw new BadRequestAlertException("A new assignmentYearPeriod cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AssignmentYearPeriodDTO result = assignmentYearPeriodService.save(assignmentYearPeriodDTO);
        return ResponseEntity.created(new URI("/api/assignment-year-periods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /assignment-year-periods : Updates an existing assignmentYearPeriod.
     *
     * @param assignmentYearPeriodDTO the assignmentYearPeriodDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated assignmentYearPeriodDTO,
     * or with status 400 (Bad Request) if the assignmentYearPeriodDTO is not valid,
     * or with status 500 (Internal Server Error) if the assignmentYearPeriodDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/assignment-year-periods")
    @Timed
    public ResponseEntity<AssignmentYearPeriodDTO> updateAssignmentYearPeriod(@RequestBody AssignmentYearPeriodDTO assignmentYearPeriodDTO) throws URISyntaxException {
        log.debug("REST request to update AssignmentYearPeriod : {}", assignmentYearPeriodDTO);
        if (assignmentYearPeriodDTO.getId() == null) {
            return createAssignmentYearPeriod(assignmentYearPeriodDTO);
        }
        AssignmentYearPeriodDTO result = assignmentYearPeriodService.save(assignmentYearPeriodDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, assignmentYearPeriodDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /assignment-year-periods : get all the assignmentYearPeriods.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of assignmentYearPeriods in body
     */
    @GetMapping("/assignment-year-periods")
    @Timed
    public List<AssignmentYearPeriodDTO> getAllAssignmentYearPeriods() {
        log.debug("REST request to get all AssignmentYearPeriods");
        return assignmentYearPeriodService.findAll();
        }

    /**
     * GET  /assignment-year-periods/:id : get the "id" assignmentYearPeriod.
     *
     * @param id the id of the assignmentYearPeriodDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the assignmentYearPeriodDTO, or with status 404 (Not Found)
     */
    @GetMapping("/assignment-year-periods/{id}")
    @Timed
    public ResponseEntity<AssignmentYearPeriodDTO> getAssignmentYearPeriod(@PathVariable Long id) {
        log.debug("REST request to get AssignmentYearPeriod : {}", id);
        AssignmentYearPeriodDTO assignmentYearPeriodDTO = assignmentYearPeriodService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(assignmentYearPeriodDTO));
    }

    /**
     * DELETE  /assignment-year-periods/:id : delete the "id" assignmentYearPeriod.
     *
     * @param id the id of the assignmentYearPeriodDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/assignment-year-periods/{id}")
    @Timed
    public ResponseEntity<Void> deleteAssignmentYearPeriod(@PathVariable Long id) {
        log.debug("REST request to delete AssignmentYearPeriod : {}", id);
        assignmentYearPeriodService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
