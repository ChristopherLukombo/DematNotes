package org.csid.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.csid.service.InterventionService;
import org.csid.web.rest.errors.BadRequestAlertException;
import org.csid.web.rest.util.HeaderUtil;
import org.csid.service.dto.InterventionDTO;
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
 * REST controller for managing Intervention.
 */
@RestController
@RequestMapping("/api")
public class InterventionResource {

    private final Logger log = LoggerFactory.getLogger(InterventionResource.class);

    private static final String ENTITY_NAME = "intervention";

    private final InterventionService interventionService;

    public InterventionResource(InterventionService interventionService) {
        this.interventionService = interventionService;
    }

    /**
     * POST  /interventions : Create a new intervention.
     *
     * @param interventionDTO the interventionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new interventionDTO, or with status 400 (Bad Request) if the intervention has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/interventions")
    @Timed
    public ResponseEntity<InterventionDTO> createIntervention(@Valid @RequestBody InterventionDTO interventionDTO) throws URISyntaxException {
        log.debug("REST request to save Intervention : {}", interventionDTO);
        if (interventionDTO.getId() != null) {
            throw new BadRequestAlertException("A new intervention cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InterventionDTO result = interventionService.save(interventionDTO);
        return ResponseEntity.created(new URI("/api/interventions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /interventions : Updates an existing intervention.
     *
     * @param interventionDTO the interventionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated interventionDTO,
     * or with status 400 (Bad Request) if the interventionDTO is not valid,
     * or with status 500 (Internal Server Error) if the interventionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/interventions")
    @Timed
    public ResponseEntity<InterventionDTO> updateIntervention(@Valid @RequestBody InterventionDTO interventionDTO) throws URISyntaxException {
        log.debug("REST request to update Intervention : {}", interventionDTO);
        if (interventionDTO.getId() == null) {
            return createIntervention(interventionDTO);
        }
        InterventionDTO result = interventionService.save(interventionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, interventionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /interventions : get all the interventions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of interventions in body
     */
    @GetMapping("/interventions")
    @Timed
    public List<InterventionDTO> getAllInterventions() {
        log.debug("REST request to get all Interventions");
        return interventionService.findAll();
        }

    /**
     * GET  /interventions/:id : get the "id" intervention.
     *
     * @param id the id of the interventionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the interventionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/interventions/{id}")
    @Timed
    public ResponseEntity<InterventionDTO> getIntervention(@PathVariable Long id) {
        log.debug("REST request to get Intervention : {}", id);
        InterventionDTO interventionDTO = interventionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(interventionDTO));
    }

    /**
     * DELETE  /interventions/:id : delete the "id" intervention.
     *
     * @param id the id of the interventionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/interventions/{id}")
    @Timed
    public ResponseEntity<Void> deleteIntervention(@PathVariable Long id) {
        log.debug("REST request to delete Intervention : {}", id);
        interventionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
