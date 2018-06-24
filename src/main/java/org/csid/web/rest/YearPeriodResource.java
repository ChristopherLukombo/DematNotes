package org.csid.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.csid.service.YearPeriodService;
import org.csid.web.rest.errors.BadRequestAlertException;
import org.csid.web.rest.util.HeaderUtil;
import org.csid.service.dto.YearPeriodDTO;
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
 * REST controller for managing YearPeriod.
 */
@RestController
@RequestMapping("/api")
public class YearPeriodResource {

    private final Logger log = LoggerFactory.getLogger(YearPeriodResource.class);

    private static final String ENTITY_NAME = "yearPeriod";

    private final YearPeriodService yearPeriodService;

    public YearPeriodResource(YearPeriodService yearPeriodService) {
        this.yearPeriodService = yearPeriodService;
    }

    /**
     * POST  /year-periods : Create a new yearPeriod.
     *
     * @param yearPeriodDTO the yearPeriodDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new yearPeriodDTO, or with status 400 (Bad Request) if the yearPeriod has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/year-periods")
    @Timed
    public ResponseEntity<YearPeriodDTO> createYearPeriod(@Valid @RequestBody YearPeriodDTO yearPeriodDTO) throws URISyntaxException {
        log.debug("REST request to save YearPeriod : {}", yearPeriodDTO);
        if (yearPeriodDTO.getId() != null) {
            throw new BadRequestAlertException("A new yearPeriod cannot already have an ID", ENTITY_NAME, "idexists");
        }
        YearPeriodDTO result = yearPeriodService.save(yearPeriodDTO);
        return ResponseEntity.created(new URI("/api/year-periods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /year-periods : Updates an existing yearPeriod.
     *
     * @param yearPeriodDTO the yearPeriodDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated yearPeriodDTO,
     * or with status 400 (Bad Request) if the yearPeriodDTO is not valid,
     * or with status 500 (Internal Server Error) if the yearPeriodDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/year-periods")
    @Timed
    public ResponseEntity<YearPeriodDTO> updateYearPeriod(@Valid @RequestBody YearPeriodDTO yearPeriodDTO) throws URISyntaxException {
        log.debug("REST request to update YearPeriod : {}", yearPeriodDTO);
        if (yearPeriodDTO.getId() == null) {
            return createYearPeriod(yearPeriodDTO);
        }
        YearPeriodDTO result = yearPeriodService.save(yearPeriodDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, yearPeriodDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /year-periods : get all the yearPeriods.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of yearPeriods in body
     */
    @GetMapping("/year-periods")
    @Timed
    public List<YearPeriodDTO> getAllYearPeriods() {
        log.debug("REST request to get all YearPeriods");
        return yearPeriodService.findAll();
        }

    /**
     * GET  /year-periods/:id : get the "id" yearPeriod.
     *
     * @param id the id of the yearPeriodDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the yearPeriodDTO, or with status 404 (Not Found)
     */
    @GetMapping("/year-periods/{id}")
    @Timed
    public ResponseEntity<YearPeriodDTO> getYearPeriod(@PathVariable Long id) {
        log.debug("REST request to get YearPeriod : {}", id);
        YearPeriodDTO yearPeriodDTO = yearPeriodService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(yearPeriodDTO));
    }

    /**
     * DELETE  /year-periods/:id : delete the "id" yearPeriod.
     *
     * @param id the id of the yearPeriodDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/year-periods/{id}")
    @Timed
    public ResponseEntity<Void> deleteYearPeriod(@PathVariable Long id) {
        log.debug("REST request to delete YearPeriod : {}", id);
        yearPeriodService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
