package org.csid.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.csid.service.InscriptionModuleService;
import org.csid.web.rest.errors.BadRequestAlertException;
import org.csid.web.rest.util.HeaderUtil;
import org.csid.service.dto.InscriptionModuleDTO;
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
 * REST controller for managing InscriptionModule.
 */
@RestController
@RequestMapping("/api")
public class InscriptionModuleResource {

    private final Logger log = LoggerFactory.getLogger(InscriptionModuleResource.class);

    private static final String ENTITY_NAME = "inscriptionModule";

    private final InscriptionModuleService inscriptionModuleService;

    public InscriptionModuleResource(InscriptionModuleService inscriptionModuleService) {
        this.inscriptionModuleService = inscriptionModuleService;
    }

    /**
     * POST  /inscription-modules : Create a new inscriptionModule.
     *
     * @param inscriptionModuleDTO the inscriptionModuleDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new inscriptionModuleDTO, or with status 400 (Bad Request) if the inscriptionModule has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/inscription-modules")
    @Timed
    public ResponseEntity<InscriptionModuleDTO> createInscriptionModule(@Valid @RequestBody InscriptionModuleDTO inscriptionModuleDTO) throws URISyntaxException {
        log.debug("REST request to save InscriptionModule : {}", inscriptionModuleDTO);
        if (inscriptionModuleDTO.getId() != null) {
            throw new BadRequestAlertException("A new inscriptionModule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InscriptionModuleDTO result = inscriptionModuleService.save(inscriptionModuleDTO);
        return ResponseEntity.created(new URI("/api/inscription-modules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /inscription-modules : Updates an existing inscriptionModule.
     *
     * @param inscriptionModuleDTO the inscriptionModuleDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated inscriptionModuleDTO,
     * or with status 400 (Bad Request) if the inscriptionModuleDTO is not valid,
     * or with status 500 (Internal Server Error) if the inscriptionModuleDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/inscription-modules")
    @Timed
    public ResponseEntity<InscriptionModuleDTO> updateInscriptionModule(@Valid @RequestBody InscriptionModuleDTO inscriptionModuleDTO) throws URISyntaxException {
        log.debug("REST request to update InscriptionModule : {}", inscriptionModuleDTO);
        if (inscriptionModuleDTO.getId() == null) {
            return createInscriptionModule(inscriptionModuleDTO);
        }
        InscriptionModuleDTO result = inscriptionModuleService.save(inscriptionModuleDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, inscriptionModuleDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /inscription-modules : get all the inscriptionModules.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of inscriptionModules in body
     */
    @GetMapping("/inscription-modules")
    @Timed
    public List<InscriptionModuleDTO> getAllInscriptionModules() {
        log.debug("REST request to get all InscriptionModules");
        return inscriptionModuleService.findAll();
        }

    /**
     * GET  /inscription-modules/:id : get the "id" inscriptionModule.
     *
     * @param id the id of the inscriptionModuleDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the inscriptionModuleDTO, or with status 404 (Not Found)
     */
    @GetMapping("/inscription-modules/{id}")
    @Timed
    public ResponseEntity<InscriptionModuleDTO> getInscriptionModule(@PathVariable Long id) {
        log.debug("REST request to get InscriptionModule : {}", id);
        InscriptionModuleDTO inscriptionModuleDTO = inscriptionModuleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(inscriptionModuleDTO));
    }

    /**
     * DELETE  /inscription-modules/:id : delete the "id" inscriptionModule.
     *
     * @param id the id of the inscriptionModuleDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/inscription-modules/{id}")
    @Timed
    public ResponseEntity<Void> deleteInscriptionModule(@PathVariable Long id) {
        log.debug("REST request to delete InscriptionModule : {}", id);
        inscriptionModuleService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
