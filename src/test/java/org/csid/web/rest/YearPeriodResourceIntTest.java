package org.csid.web.rest;

import org.csid.DematNotesApp;

import org.csid.domain.YearPeriod;
import org.csid.repository.YearPeriodRepository;
import org.csid.service.YearPeriodService;
import org.csid.service.dto.YearPeriodDTO;
import org.csid.service.mapper.YearPeriodMapper;
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
 * Test class for the YearPeriodResource REST controller.
 *
 * @see YearPeriodResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DematNotesApp.class)
public class YearPeriodResourceIntTest {

    private static final String DEFAULT_ENTITLED = "AAAAAAAAAA";
    private static final String UPDATED_ENTITLED = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private YearPeriodRepository yearPeriodRepository;

    @Autowired
    private YearPeriodMapper yearPeriodMapper;

    @Autowired
    private YearPeriodService yearPeriodService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restYearPeriodMockMvc;

    private YearPeriod yearPeriod;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final YearPeriodResource yearPeriodResource = new YearPeriodResource(yearPeriodService);
        this.restYearPeriodMockMvc = MockMvcBuilders.standaloneSetup(yearPeriodResource)
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
    public static YearPeriod createEntity(EntityManager em) {
        YearPeriod yearPeriod = new YearPeriod()
            .entitled(DEFAULT_ENTITLED)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return yearPeriod;
    }

    @Before
    public void initTest() {
        yearPeriod = createEntity(em);
    }

    @Test
    @Transactional
    public void createYearPeriod() throws Exception {
        int databaseSizeBeforeCreate = yearPeriodRepository.findAll().size();

        // Create the YearPeriod
        YearPeriodDTO yearPeriodDTO = yearPeriodMapper.toDto(yearPeriod);
        restYearPeriodMockMvc.perform(post("/api/year-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yearPeriodDTO)))
            .andExpect(status().isCreated());

        // Validate the YearPeriod in the database
        List<YearPeriod> yearPeriodList = yearPeriodRepository.findAll();
        assertThat(yearPeriodList).hasSize(databaseSizeBeforeCreate + 1);
        YearPeriod testYearPeriod = yearPeriodList.get(yearPeriodList.size() - 1);
        assertThat(testYearPeriod.getEntitled()).isEqualTo(DEFAULT_ENTITLED);
        assertThat(testYearPeriod.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testYearPeriod.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    public void createYearPeriodWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = yearPeriodRepository.findAll().size();

        // Create the YearPeriod with an existing ID
        yearPeriod.setId(1L);
        YearPeriodDTO yearPeriodDTO = yearPeriodMapper.toDto(yearPeriod);

        // An entity with an existing ID cannot be created, so this API call must fail
        restYearPeriodMockMvc.perform(post("/api/year-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yearPeriodDTO)))
            .andExpect(status().isBadRequest());

        // Validate the YearPeriod in the database
        List<YearPeriod> yearPeriodList = yearPeriodRepository.findAll();
        assertThat(yearPeriodList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkEntitledIsRequired() throws Exception {
        int databaseSizeBeforeTest = yearPeriodRepository.findAll().size();
        // set the field null
        yearPeriod.setEntitled(null);

        // Create the YearPeriod, which fails.
        YearPeriodDTO yearPeriodDTO = yearPeriodMapper.toDto(yearPeriod);

        restYearPeriodMockMvc.perform(post("/api/year-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yearPeriodDTO)))
            .andExpect(status().isBadRequest());

        List<YearPeriod> yearPeriodList = yearPeriodRepository.findAll();
        assertThat(yearPeriodList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = yearPeriodRepository.findAll().size();
        // set the field null
        yearPeriod.setStartDate(null);

        // Create the YearPeriod, which fails.
        YearPeriodDTO yearPeriodDTO = yearPeriodMapper.toDto(yearPeriod);

        restYearPeriodMockMvc.perform(post("/api/year-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yearPeriodDTO)))
            .andExpect(status().isBadRequest());

        List<YearPeriod> yearPeriodList = yearPeriodRepository.findAll();
        assertThat(yearPeriodList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllYearPeriods() throws Exception {
        // Initialize the database
        yearPeriodRepository.saveAndFlush(yearPeriod);

        // Get all the yearPeriodList
        restYearPeriodMockMvc.perform(get("/api/year-periods?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(yearPeriod.getId().intValue())))
            .andExpect(jsonPath("$.[*].entitled").value(hasItem(DEFAULT_ENTITLED.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }

    @Test
    @Transactional
    public void getYearPeriod() throws Exception {
        // Initialize the database
        yearPeriodRepository.saveAndFlush(yearPeriod);

        // Get the yearPeriod
        restYearPeriodMockMvc.perform(get("/api/year-periods/{id}", yearPeriod.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(yearPeriod.getId().intValue()))
            .andExpect(jsonPath("$.entitled").value(DEFAULT_ENTITLED.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingYearPeriod() throws Exception {
        // Get the yearPeriod
        restYearPeriodMockMvc.perform(get("/api/year-periods/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateYearPeriod() throws Exception {
        // Initialize the database
        yearPeriodRepository.saveAndFlush(yearPeriod);
        int databaseSizeBeforeUpdate = yearPeriodRepository.findAll().size();

        // Update the yearPeriod
        YearPeriod updatedYearPeriod = yearPeriodRepository.findOne(yearPeriod.getId());
        // Disconnect from session so that the updates on updatedYearPeriod are not directly saved in db
        em.detach(updatedYearPeriod);
        updatedYearPeriod
            .entitled(UPDATED_ENTITLED)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        YearPeriodDTO yearPeriodDTO = yearPeriodMapper.toDto(updatedYearPeriod);

        restYearPeriodMockMvc.perform(put("/api/year-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yearPeriodDTO)))
            .andExpect(status().isOk());

        // Validate the YearPeriod in the database
        List<YearPeriod> yearPeriodList = yearPeriodRepository.findAll();
        assertThat(yearPeriodList).hasSize(databaseSizeBeforeUpdate);
        YearPeriod testYearPeriod = yearPeriodList.get(yearPeriodList.size() - 1);
        assertThat(testYearPeriod.getEntitled()).isEqualTo(UPDATED_ENTITLED);
        assertThat(testYearPeriod.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testYearPeriod.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingYearPeriod() throws Exception {
        int databaseSizeBeforeUpdate = yearPeriodRepository.findAll().size();

        // Create the YearPeriod
        YearPeriodDTO yearPeriodDTO = yearPeriodMapper.toDto(yearPeriod);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restYearPeriodMockMvc.perform(put("/api/year-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yearPeriodDTO)))
            .andExpect(status().isCreated());

        // Validate the YearPeriod in the database
        List<YearPeriod> yearPeriodList = yearPeriodRepository.findAll();
        assertThat(yearPeriodList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteYearPeriod() throws Exception {
        // Initialize the database
        yearPeriodRepository.saveAndFlush(yearPeriod);
        int databaseSizeBeforeDelete = yearPeriodRepository.findAll().size();

        // Get the yearPeriod
        restYearPeriodMockMvc.perform(delete("/api/year-periods/{id}", yearPeriod.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<YearPeriod> yearPeriodList = yearPeriodRepository.findAll();
        assertThat(yearPeriodList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(YearPeriod.class);
        YearPeriod yearPeriod1 = new YearPeriod();
        yearPeriod1.setId(1L);
        YearPeriod yearPeriod2 = new YearPeriod();
        yearPeriod2.setId(yearPeriod1.getId());
        assertThat(yearPeriod1).isEqualTo(yearPeriod2);
        yearPeriod2.setId(2L);
        assertThat(yearPeriod1).isNotEqualTo(yearPeriod2);
        yearPeriod1.setId(null);
        assertThat(yearPeriod1).isNotEqualTo(yearPeriod2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(YearPeriodDTO.class);
        YearPeriodDTO yearPeriodDTO1 = new YearPeriodDTO();
        yearPeriodDTO1.setId(1L);
        YearPeriodDTO yearPeriodDTO2 = new YearPeriodDTO();
        assertThat(yearPeriodDTO1).isNotEqualTo(yearPeriodDTO2);
        yearPeriodDTO2.setId(yearPeriodDTO1.getId());
        assertThat(yearPeriodDTO1).isEqualTo(yearPeriodDTO2);
        yearPeriodDTO2.setId(2L);
        assertThat(yearPeriodDTO1).isNotEqualTo(yearPeriodDTO2);
        yearPeriodDTO1.setId(null);
        assertThat(yearPeriodDTO1).isNotEqualTo(yearPeriodDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(yearPeriodMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(yearPeriodMapper.fromId(null)).isNull();
    }
}
