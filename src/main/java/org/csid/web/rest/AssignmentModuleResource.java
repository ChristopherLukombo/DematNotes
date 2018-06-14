package org.csid.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.csid.service.AssignmentModuleService;
import org.csid.web.rest.errors.BadRequestAlertException;
import org.csid.web.rest.util.HeaderUtil;
import org.csid.service.dto.AssignmentModuleDTO;
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
 * REST controller for managing AssignmentModule.
 */
@RestController
@RequestMapping("/api")
public class AssignmentModuleResource {

    private final Logger log = LoggerFactory.getLogger(AssignmentModuleResource.class);

    private static final String ENTITY_NAME = "assignmentModule";

    private final AssignmentModuleService assignmentModuleService;

    public AssignmentModuleResource(AssignmentModuleService assignmentModuleService) {
        this.assignmentModuleService = assignmentModuleService;
    }

    /**
     * POST  /assignment-modules : Create a new assignmentModule.
     *
     * @param assignmentModuleDTO the assignmentModuleDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new assignmentModuleDTO, or with status 400 (Bad Request) if the assignmentModule has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/assignment-modules")
    @Timed
    public ResponseEntity<AssignmentModuleDTO> createAssignmentModule(@RequestBody AssignmentModuleDTO assignmentModuleDTO) throws URISyntaxException {
        log.debug("REST request to save AssignmentModule : {}", assignmentModuleDTO);
        if (assignmentModuleDTO.getId() != null) {
            throw new BadRequestAlertException("A new assignmentModule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AssignmentModuleDTO result = assignmentModuleService.save(assignmentModuleDTO);
        return ResponseEntity.created(new URI("/api/assignment-modules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /assignment-modules : Updates an existing assignmentModule.
     *
     * @param assignmentModuleDTO the assignmentModuleDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated assignmentModuleDTO,
     * or with status 400 (Bad Request) if the assignmentModuleDTO is not valid,
     * or with status 500 (Internal Server Error) if the assignmentModuleDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/assignment-modules")
    @Timed
    public ResponseEntity<AssignmentModuleDTO> updateAssignmentModule(@RequestBody AssignmentModuleDTO assignmentModuleDTO) throws URISyntaxException {
        log.debug("REST request to update AssignmentModule : {}", assignmentModuleDTO);
        if (assignmentModuleDTO.getId() == null) {
            return createAssignmentModule(assignmentModuleDTO);
        }
        AssignmentModuleDTO result = assignmentModuleService.save(assignmentModuleDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, assignmentModuleDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /assignment-modules : get all the assignmentModules.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of assignmentModules in body
     */
    @GetMapping("/assignment-modules")
    @Timed
    public List<AssignmentModuleDTO> getAllAssignmentModules() {
        log.debug("REST request to get all AssignmentModules");
        return assignmentModuleService.findAll();
        }

    /**
     * GET  /assignment-modules/:id : get the "id" assignmentModule.
     *
     * @param id the id of the assignmentModuleDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the assignmentModuleDTO, or with status 404 (Not Found)
     */
    @GetMapping("/assignment-modules/{id}")
    @Timed
    public ResponseEntity<AssignmentModuleDTO> getAssignmentModule(@PathVariable Long id) {
        log.debug("REST request to get AssignmentModule : {}", id);
        AssignmentModuleDTO assignmentModuleDTO = assignmentModuleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(assignmentModuleDTO));
    }

    /**
     * DELETE  /assignment-modules/:id : delete the "id" assignmentModule.
     *
     * @param id the id of the assignmentModuleDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/assignment-modules/{id}")
    @Timed
    public ResponseEntity<Void> deleteAssignmentModule(@PathVariable Long id) {
        log.debug("REST request to delete AssignmentModule : {}", id);
        assignmentModuleService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
