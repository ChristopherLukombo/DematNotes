package org.csid.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.csid.service.DelayStudentService;
import org.csid.web.rest.errors.BadRequestAlertException;
import org.csid.web.rest.util.HeaderUtil;
import org.csid.service.dto.DelayStudentDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing DelayStudent.
 */
@RestController
@RequestMapping("/api")
public class DelayStudentResource {

    private final Logger log = LoggerFactory.getLogger(DelayStudentResource.class);

    private static final String ENTITY_NAME = "delayStudent";

    private final DelayStudentService delayStudentService;

    public DelayStudentResource(DelayStudentService delayStudentService) {
        this.delayStudentService = delayStudentService;
    }

    /**
     * POST  /delay-students : Create a new delayStudent.
     *
     * @param delayStudentDTO the delayStudentDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new delayStudentDTO, or with status 400 (Bad Request) if the delayStudent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/delay-students")
    @Timed
    public ResponseEntity<DelayStudentDTO> createDelayStudent(@Valid @RequestBody DelayStudentDTO delayStudentDTO) throws URISyntaxException {
        log.debug("REST request to save DelayStudent : {}", delayStudentDTO);
        if (delayStudentDTO.getId() != null) {
            throw new BadRequestAlertException("A new delayStudent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DelayStudentDTO result = delayStudentService.save(delayStudentDTO);
        return ResponseEntity.created(new URI("/api/delay-students/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /delay-students : Updates an existing delayStudent.
     *
     * @param delayStudentDTO the delayStudentDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated delayStudentDTO,
     * or with status 400 (Bad Request) if the delayStudentDTO is not valid,
     * or with status 500 (Internal Server Error) if the delayStudentDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/delay-students")
    @Timed
    public ResponseEntity<DelayStudentDTO> updateDelayStudent(@Valid @RequestBody DelayStudentDTO delayStudentDTO) throws URISyntaxException {
        log.debug("REST request to update DelayStudent : {}", delayStudentDTO);
        if (delayStudentDTO.getId() == null) {
            return createDelayStudent(delayStudentDTO);
        }
        DelayStudentDTO result = delayStudentService.save(delayStudentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, delayStudentDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /delay-students : get all the delayStudents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of delayStudents in body
     */
    @GetMapping("/delay-students")
    @Timed
    public List<DelayStudentDTO> getAllDelayStudents() {
        log.debug("REST request to get all DelayStudents");
        return delayStudentService.findAll();
        }

    /**
     * GET  /delay-students/:id : get the "id" delayStudent.
     *
     * @param id the id of the delayStudentDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the delayStudentDTO, or with status 404 (Not Found)
     */
    @GetMapping("/delay-students/{id}")
    @Timed
    public ResponseEntity<DelayStudentDTO> getDelayStudent(@PathVariable Long id) {
        log.debug("REST request to get DelayStudent : {}", id);
        DelayStudentDTO delayStudentDTO = delayStudentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(delayStudentDTO));
    }

    /**
     * DELETE  /delay-students/:id : delete the "id" delayStudent.
     *
     * @param id the id of the delayStudentDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/delay-students/{id}")
    @Timed
    public ResponseEntity<Void> deleteDelayStudent(@PathVariable Long id) {
        log.debug("REST request to delete DelayStudent : {}", id);
        delayStudentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
