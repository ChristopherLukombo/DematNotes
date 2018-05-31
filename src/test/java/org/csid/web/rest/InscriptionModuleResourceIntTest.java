package org.csid.web.rest;

import org.csid.DematNotesApp;

import org.csid.domain.InscriptionModule;
import org.csid.repository.InscriptionModuleRepository;
import org.csid.service.InscriptionModuleService;
import org.csid.service.dto.InscriptionModuleDTO;
import org.csid.service.mapper.InscriptionModuleMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.csid.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the InscriptionModuleResource REST controller.
 *
 * @see InscriptionModuleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DematNotesApp.class)
public class InscriptionModuleResourceIntTest {

    private static final LocalDate DEFAULT_INSCRIPTION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_INSCRIPTION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_VALIDATION = "AAAAAAAAAA";
    private static final String UPDATED_VALIDATION = "BBBBBBBBBB";

    private static final String DEFAULT_YEAR_PERIOD = "AAAAAAAAAA";
    private static final String UPDATED_YEAR_PERIOD = "BBBBBBBBBB";

    @Autowired
    private InscriptionModuleRepository inscriptionModuleRepository;

    @Autowired
    private InscriptionModuleMapper inscriptionModuleMapper;

    @Autowired
    private InscriptionModuleService inscriptionModuleService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInscriptionModuleMockMvc;

    private InscriptionModule inscriptionModule;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InscriptionModuleResource inscriptionModuleResource = new InscriptionModuleResource(inscriptionModuleService);
        this.restInscriptionModuleMockMvc = MockMvcBuilders.standaloneSetup(inscriptionModuleResource)
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
    public static InscriptionModule createEntity(EntityManager em) {
        InscriptionModule inscriptionModule = new InscriptionModule()
            .inscriptionDate(DEFAULT_INSCRIPTION_DATE)
            .validation(DEFAULT_VALIDATION)
            .yearPeriod(DEFAULT_YEAR_PERIOD);
        return inscriptionModule;
    }

    @Before
    public void initTest() {
        inscriptionModule = createEntity(em);
    }

    @Test
    @Transactional
    public void createInscriptionModule() throws Exception {
        int databaseSizeBeforeCreate = inscriptionModuleRepository.findAll().size();

        // Create the InscriptionModule
        InscriptionModuleDTO inscriptionModuleDTO = inscriptionModuleMapper.toDto(inscriptionModule);
        restInscriptionModuleMockMvc.perform(post("/api/inscription-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inscriptionModuleDTO)))
            .andExpect(status().isCreated());

        // Validate the InscriptionModule in the database
        List<InscriptionModule> inscriptionModuleList = inscriptionModuleRepository.findAll();
        assertThat(inscriptionModuleList).hasSize(databaseSizeBeforeCreate + 1);
        InscriptionModule testInscriptionModule = inscriptionModuleList.get(inscriptionModuleList.size() - 1);
        assertThat(testInscriptionModule.getInscriptionDate()).isEqualTo(DEFAULT_INSCRIPTION_DATE);
        assertThat(testInscriptionModule.getValidation()).isEqualTo(DEFAULT_VALIDATION);
        assertThat(testInscriptionModule.getYearPeriod()).isEqualTo(DEFAULT_YEAR_PERIOD);
    }

    @Test
    @Transactional
    public void createInscriptionModuleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = inscriptionModuleRepository.findAll().size();

        // Create the InscriptionModule with an existing ID
        inscriptionModule.setId(1L);
        InscriptionModuleDTO inscriptionModuleDTO = inscriptionModuleMapper.toDto(inscriptionModule);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInscriptionModuleMockMvc.perform(post("/api/inscription-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inscriptionModuleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the InscriptionModule in the database
        List<InscriptionModule> inscriptionModuleList = inscriptionModuleRepository.findAll();
        assertThat(inscriptionModuleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkInscriptionDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = inscriptionModuleRepository.findAll().size();
        // set the field null
        inscriptionModule.setInscriptionDate(null);

        // Create the InscriptionModule, which fails.
        InscriptionModuleDTO inscriptionModuleDTO = inscriptionModuleMapper.toDto(inscriptionModule);

        restInscriptionModuleMockMvc.perform(post("/api/inscription-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inscriptionModuleDTO)))
            .andExpect(status().isBadRequest());

        List<InscriptionModule> inscriptionModuleList = inscriptionModuleRepository.findAll();
        assertThat(inscriptionModuleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkYearPeriodIsRequired() throws Exception {
        int databaseSizeBeforeTest = inscriptionModuleRepository.findAll().size();
        // set the field null
        inscriptionModule.setYearPeriod(null);

        // Create the InscriptionModule, which fails.
        InscriptionModuleDTO inscriptionModuleDTO = inscriptionModuleMapper.toDto(inscriptionModule);

        restInscriptionModuleMockMvc.perform(post("/api/inscription-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inscriptionModuleDTO)))
            .andExpect(status().isBadRequest());

        List<InscriptionModule> inscriptionModuleList = inscriptionModuleRepository.findAll();
        assertThat(inscriptionModuleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInscriptionModules() throws Exception {
        // Initialize the database
        inscriptionModuleRepository.saveAndFlush(inscriptionModule);

        // Get all the inscriptionModuleList
        restInscriptionModuleMockMvc.perform(get("/api/inscription-modules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(inscriptionModule.getId().intValue())))
            .andExpect(jsonPath("$.[*].inscriptionDate").value(hasItem(DEFAULT_INSCRIPTION_DATE.toString())))
            .andExpect(jsonPath("$.[*].validation").value(hasItem(DEFAULT_VALIDATION.toString())))
            .andExpect(jsonPath("$.[*].yearPeriod").value(hasItem(DEFAULT_YEAR_PERIOD.toString())));
    }

    @Test
    @Transactional
    public void getInscriptionModule() throws Exception {
        // Initialize the database
        inscriptionModuleRepository.saveAndFlush(inscriptionModule);

        // Get the inscriptionModule
        restInscriptionModuleMockMvc.perform(get("/api/inscription-modules/{id}", inscriptionModule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(inscriptionModule.getId().intValue()))
            .andExpect(jsonPath("$.inscriptionDate").value(DEFAULT_INSCRIPTION_DATE.toString()))
            .andExpect(jsonPath("$.validation").value(DEFAULT_VALIDATION.toString()))
            .andExpect(jsonPath("$.yearPeriod").value(DEFAULT_YEAR_PERIOD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInscriptionModule() throws Exception {
        // Get the inscriptionModule
        restInscriptionModuleMockMvc.perform(get("/api/inscription-modules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInscriptionModule() throws Exception {
        // Initialize the database
        inscriptionModuleRepository.saveAndFlush(inscriptionModule);
        int databaseSizeBeforeUpdate = inscriptionModuleRepository.findAll().size();

        // Update the inscriptionModule
        InscriptionModule updatedInscriptionModule = inscriptionModuleRepository.findOne(inscriptionModule.getId());
        // Disconnect from session so that the updates on updatedInscriptionModule are not directly saved in db
        em.detach(updatedInscriptionModule);
        updatedInscriptionModule
            .inscriptionDate(UPDATED_INSCRIPTION_DATE)
            .validation(UPDATED_VALIDATION)
            .yearPeriod(UPDATED_YEAR_PERIOD);
        InscriptionModuleDTO inscriptionModuleDTO = inscriptionModuleMapper.toDto(updatedInscriptionModule);

        restInscriptionModuleMockMvc.perform(put("/api/inscription-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inscriptionModuleDTO)))
            .andExpect(status().isOk());

        // Validate the InscriptionModule in the database
        List<InscriptionModule> inscriptionModuleList = inscriptionModuleRepository.findAll();
        assertThat(inscriptionModuleList).hasSize(databaseSizeBeforeUpdate);
        InscriptionModule testInscriptionModule = inscriptionModuleList.get(inscriptionModuleList.size() - 1);
        assertThat(testInscriptionModule.getInscriptionDate()).isEqualTo(UPDATED_INSCRIPTION_DATE);
        assertThat(testInscriptionModule.getValidation()).isEqualTo(UPDATED_VALIDATION);
        assertThat(testInscriptionModule.getYearPeriod()).isEqualTo(UPDATED_YEAR_PERIOD);
    }

    @Test
    @Transactional
    public void updateNonExistingInscriptionModule() throws Exception {
        int databaseSizeBeforeUpdate = inscriptionModuleRepository.findAll().size();

        // Create the InscriptionModule
        InscriptionModuleDTO inscriptionModuleDTO = inscriptionModuleMapper.toDto(inscriptionModule);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restInscriptionModuleMockMvc.perform(put("/api/inscription-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inscriptionModuleDTO)))
            .andExpect(status().isCreated());

        // Validate the InscriptionModule in the database
        List<InscriptionModule> inscriptionModuleList = inscriptionModuleRepository.findAll();
        assertThat(inscriptionModuleList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteInscriptionModule() throws Exception {
        // Initialize the database
        inscriptionModuleRepository.saveAndFlush(inscriptionModule);
        int databaseSizeBeforeDelete = inscriptionModuleRepository.findAll().size();

        // Get the inscriptionModule
        restInscriptionModuleMockMvc.perform(delete("/api/inscription-modules/{id}", inscriptionModule.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<InscriptionModule> inscriptionModuleList = inscriptionModuleRepository.findAll();
        assertThat(inscriptionModuleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InscriptionModule.class);
        InscriptionModule inscriptionModule1 = new InscriptionModule();
        inscriptionModule1.setId(1L);
        InscriptionModule inscriptionModule2 = new InscriptionModule();
        inscriptionModule2.setId(inscriptionModule1.getId());
        assertThat(inscriptionModule1).isEqualTo(inscriptionModule2);
        inscriptionModule2.setId(2L);
        assertThat(inscriptionModule1).isNotEqualTo(inscriptionModule2);
        inscriptionModule1.setId(null);
        assertThat(inscriptionModule1).isNotEqualTo(inscriptionModule2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(InscriptionModuleDTO.class);
        InscriptionModuleDTO inscriptionModuleDTO1 = new InscriptionModuleDTO();
        inscriptionModuleDTO1.setId(1L);
        InscriptionModuleDTO inscriptionModuleDTO2 = new InscriptionModuleDTO();
        assertThat(inscriptionModuleDTO1).isNotEqualTo(inscriptionModuleDTO2);
        inscriptionModuleDTO2.setId(inscriptionModuleDTO1.getId());
        assertThat(inscriptionModuleDTO1).isEqualTo(inscriptionModuleDTO2);
        inscriptionModuleDTO2.setId(2L);
        assertThat(inscriptionModuleDTO1).isNotEqualTo(inscriptionModuleDTO2);
        inscriptionModuleDTO1.setId(null);
        assertThat(inscriptionModuleDTO1).isNotEqualTo(inscriptionModuleDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(inscriptionModuleMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(inscriptionModuleMapper.fromId(null)).isNull();
    }
}
