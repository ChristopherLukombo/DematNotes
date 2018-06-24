package org.csid.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.csid.service.AssignmentManagerService;
import org.csid.web.rest.errors.BadRequestAlertException;
import org.csid.web.rest.util.HeaderUtil;
import org.csid.service.dto.AssignmentManagerDTO;
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
 * REST controller for managing AssignmentManager.
 */
@RestController
@RequestMapping("/api")
public class AssignmentManagerResource {

    private final Logger log = LoggerFactory.getLogger(AssignmentManagerResource.class);

    private static final String ENTITY_NAME = "assignmentManager";

    private final AssignmentManagerService assignmentManagerService;

    public AssignmentManagerResource(AssignmentManagerService assignmentManagerService) {
        this.assignmentManagerService = assignmentManagerService;
    }

    /**
     * POST  /assignment-managers : Create a new assignmentManager.
     *
     * @param assignmentManagerDTO the assignmentManagerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new assignmentManagerDTO, or with status 400 (Bad Request) if the assignmentManager has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/assignment-managers")
    @Timed
    public ResponseEntity<AssignmentManagerDTO> createAssignmentManager(@RequestBody AssignmentManagerDTO assignmentManagerDTO) throws URISyntaxException {
        log.debug("REST request to save AssignmentManager : {}", assignmentManagerDTO);
        if (assignmentManagerDTO.getId() != null) {
            throw new BadRequestAlertException("A new assignmentManager cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AssignmentManagerDTO result = assignmentManagerService.save(assignmentManagerDTO);
        return ResponseEntity.created(new URI("/api/assignment-managers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /assignment-managers : Updates an existing assignmentManager.
     *
     * @param assignmentManagerDTO the assignmentManagerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated assignmentManagerDTO,
     * or with status 400 (Bad Request) if the assignmentManagerDTO is not valid,
     * or with status 500 (Internal Server Error) if the assignmentManagerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/assignment-managers")
    @Timed
    public ResponseEntity<AssignmentManagerDTO> updateAssignmentManager(@RequestBody AssignmentManagerDTO assignmentManagerDTO) throws URISyntaxException {
        log.debug("REST request to update AssignmentManager : {}", assignmentManagerDTO);
        if (assignmentManagerDTO.getId() == null) {
            return createAssignmentManager(assignmentManagerDTO);
        }
        AssignmentManagerDTO result = assignmentManagerService.save(assignmentManagerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, assignmentManagerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /assignment-managers : get all the assignmentManagers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of assignmentManagers in body
     */
    @GetMapping("/assignment-managers")
    @Timed
    public List<AssignmentManagerDTO> getAllAssignmentManagers() {
        log.debug("REST request to get all AssignmentManagers");
        return assignmentManagerService.findAll();
        }

    /**
     * GET  /assignment-managers/:id : get the "id" assignmentManager.
     *
     * @param id the id of the assignmentManagerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the assignmentManagerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/assignment-managers/{id}")
    @Timed
    public ResponseEntity<AssignmentManagerDTO> getAssignmentManager(@PathVariable Long id) {
        log.debug("REST request to get AssignmentManager : {}", id);
        AssignmentManagerDTO assignmentManagerDTO = assignmentManagerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(assignmentManagerDTO));
    }

    /**
     * DELETE  /assignment-managers/:id : delete the "id" assignmentManager.
     *
     * @param id the id of the assignmentManagerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/assignment-managers/{id}")
    @Timed
    public ResponseEntity<Void> deleteAssignmentManager(@PathVariable Long id) {
        log.debug("REST request to delete AssignmentManager : {}", id);
        assignmentManagerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
