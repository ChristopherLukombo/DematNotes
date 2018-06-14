package org.csid.web.rest;

import org.csid.DematNotesApp;

import org.csid.domain.Intervention;
import org.csid.repository.InterventionRepository;
import org.csid.service.InterventionService;
import org.csid.service.dto.InterventionDTO;
import org.csid.service.mapper.InterventionMapper;
import org.csid.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static org.csid.web.rest.TestUtil.sameInstant;
import static org.csid.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the InterventionResource REST controller.
 *
 * @see InterventionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DematNotesApp.class)
public class InterventionResourceIntTest {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_YEAR_PERIOD = "AAAAAAAAAA";
    private static final String UPDATED_YEAR_PERIOD = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_START_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_START_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_END_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_END_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private InterventionRepository interventionRepository;

    @Autowired
    private InterventionMapper interventionMapper;

    @Autowired
    private InterventionService interventionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInterventionMockMvc;

    private Intervention intervention;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InterventionResource interventionResource = new InterventionResource(interventionService);
        this.restInterventionMockMvc = MockMvcBuilders.standaloneSetup(interventionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Intervention createEntity(EntityManager em) {
        Intervention intervention = new Intervention()
            .type(DEFAULT_TYPE)
            .yearPeriod(DEFAULT_YEAR_PERIOD)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return intervention;
    }

    @Before
    public void initTest() {
        intervention = createEntity(em);
    }

    @Test
    @Transactional
    public void createIntervention() throws Exception {
        int databaseSizeBeforeCreate = interventionRepository.findAll().size();

        // Create the Intervention
        InterventionDTO interventionDTO = interventionMapper.toDto(intervention);
        restInterventionMockMvc.perform(post("/api/interventions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interventionDTO)))
            .andExpect(status().isCreated());

        // Validate the Intervention in the database
        List<Intervention> interventionList = interventionRepository.findAll();
        assertThat(interventionList).hasSize(databaseSizeBeforeCreate + 1);
        Intervention testIntervention = interventionList.get(interventionList.size() - 1);
        assertThat(testIntervention.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testIntervention.getYearPeriod()).isEqualTo(DEFAULT_YEAR_PERIOD);
        assertThat(testIntervention.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testIntervention.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    public void createInterventionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = interventionRepository.findAll().size();

        // Create the Intervention with an existing ID
        intervention.setId(1L);
        InterventionDTO interventionDTO = interventionMapper.toDto(intervention);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInterventionMockMvc.perform(post("/api/interventions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interventionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Intervention in the database
        List<Intervention> interventionList = interventionRepository.findAll();
        assertThat(interventionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = interventionRepository.findAll().size();
        // set the field null
        intervention.setType(null);

        // Create the Intervention, which fails.
        InterventionDTO interventionDTO = interventionMapper.toDto(intervention);

        restInterventionMockMvc.perform(post("/api/interventions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interventionDTO)))
            .andExpect(status().isBadRequest());

        List<Intervention> interventionList = interventionRepository.findAll();
        assertThat(interventionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkYearPeriodIsRequired() throws Exception {
        int databaseSizeBeforeTest = interventionRepository.findAll().size();
        // set the field null
        intervention.setYearPeriod(null);

        // Create the Intervention, which fails.
        InterventionDTO interventionDTO = interventionMapper.toDto(intervention);

        restInterventionMockMvc.perform(post("/api/interventions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interventionDTO)))
            .andExpect(status().isBadRequest());

        List<Intervention> interventionList = interventionRepository.findAll();
        assertThat(interventionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = interventionRepository.findAll().size();
        // set the field null
        intervention.setStartDate(null);

        // Create the Intervention, which fails.
        InterventionDTO interventionDTO = interventionMapper.toDto(intervention);

        restInterventionMockMvc.perform(post("/api/interventions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interventionDTO)))
            .andExpect(status().isBadRequest());

        List<Intervention> interventionList = interventionRepository.findAll();
        assertThat(interventionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = interventionRepository.findAll().size();
        // set the field null
        intervention.setEndDate(null);

        // Create the Intervention, which fails.
        InterventionDTO interventionDTO = interventionMapper.toDto(intervention);

        restInterventionMockMvc.perform(post("/api/interventions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interventionDTO)))
            .andExpect(status().isBadRequest());

        List<Intervention> interventionList = interventionRepository.findAll();
        assertThat(interventionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInterventions() throws Exception {
        // Initialize the database
        interventionRepository.saveAndFlush(intervention);

        // Get all the interventionList
        restInterventionMockMvc.perform(get("/api/interventions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(intervention.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].yearPeriod").value(hasItem(DEFAULT_YEAR_PERIOD.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(sameInstant(DEFAULT_START_DATE))))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(sameInstant(DEFAULT_END_DATE))));
    }

    @Test
    @Transactional
    public void getIntervention() throws Exception {
        // Initialize the database
        interventionRepository.saveAndFlush(intervention);

        // Get the intervention
        restInterventionMockMvc.perform(get("/api/interventions/{id}", intervention.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(intervention.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.yearPeriod").value(DEFAULT_YEAR_PERIOD.toString()))
            .andExpect(jsonPath("$.startDate").value(sameInstant(DEFAULT_START_DATE)))
            .andExpect(jsonPath("$.endDate").value(sameInstant(DEFAULT_END_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingIntervention() throws Exception {
        // Get the intervention
        restInterventionMockMvc.perform(get("/api/interventions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIntervention() throws Exception {
        // Initialize the database
        interventionRepository.saveAndFlush(intervention);
        int databaseSizeBeforeUpdate = interventionRepository.findAll().size();

        // Update the intervention
        Intervention updatedIntervention = interventionRepository.findOne(intervention.getId());
        // Disconnect from session so that the updates on updatedIntervention are not directly saved in db
        em.detach(updatedIntervention);
        updatedIntervention
            .type(UPDATED_TYPE)
            .yearPeriod(UPDATED_YEAR_PERIOD)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        InterventionDTO interventionDTO = interventionMapper.toDto(updatedIntervention);

        restInterventionMockMvc.perform(put("/api/interventions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interventionDTO)))
            .andExpect(status().isOk());

        // Validate the Intervention in the database
        List<Intervention> interventionList = interventionRepository.findAll();
        assertThat(interventionList).hasSize(databaseSizeBeforeUpdate);
        Intervention testIntervention = interventionList.get(interventionList.size() - 1);
        assertThat(testIntervention.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testIntervention.getYearPeriod()).isEqualTo(UPDATED_YEAR_PERIOD);
        assertThat(testIntervention.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testIntervention.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingIntervention() throws Exception {
        int databaseSizeBeforeUpdate = interventionRepository.findAll().size();

        // Create the Intervention
        InterventionDTO interventionDTO = interventionMapper.toDto(intervention);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restInterventionMockMvc.perform(put("/api/interventions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interventionDTO)))
            .andExpect(status().isCreated());

        // Validate the Intervention in the database
        List<Intervention> interventionList = interventionRepository.findAll();
        assertThat(interventionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIntervention() throws Exception {
        // Initialize the database
        interventionRepository.saveAndFlush(intervention);
        int databaseSizeBeforeDelete = interventionRepository.findAll().size();

        // Get the intervention
        restInterventionMockMvc.perform(delete("/api/interventions/{id}", intervention.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Intervention> interventionList = interventionRepository.findAll();
        assertThat(interventionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Intervention.class);
        Intervention intervention1 = new Intervention();
        intervention1.setId(1L);
        Intervention intervention2 = new Intervention();
        intervention2.setId(intervention1.getId());
        assertThat(intervention1).isEqualTo(intervention2);
        intervention2.setId(2L);
        assertThat(intervention1).isNotEqualTo(intervention2);
        intervention1.setId(null);
        assertThat(intervention1).isNotEqualTo(intervention2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(InterventionDTO.class);
        InterventionDTO interventionDTO1 = new InterventionDTO();
        interventionDTO1.setId(1L);
        InterventionDTO interventionDTO2 = new InterventionDTO();
        assertThat(interventionDTO1).isNotEqualTo(interventionDTO2);
        interventionDTO2.setId(interventionDTO1.getId());
        assertThat(interventionDTO1).isEqualTo(interventionDTO2);
        interventionDTO2.setId(2L);
        assertThat(interventionDTO1).isNotEqualTo(interventionDTO2);
        interventionDTO1.setId(null);
        assertThat(interventionDTO1).isNotEqualTo(interventionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(interventionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(interventionMapper.fromId(null)).isNull();
    }
}
