package org.csid.web.rest;

import org.csid.DematNotesApp;

import org.csid.domain.DelayStudent;
import org.csid.repository.DelayStudentRepository;
import org.csid.service.DelayStudentService;
import org.csid.service.dto.DelayStudentDTO;
import org.csid.service.mapper.DelayStudentMapper;
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
 * Test class for the DelayStudentResource REST controller.
 *
 * @see DelayStudentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DematNotesApp.class)
public class DelayStudentResourceIntTest {

    private static final ZonedDateTime DEFAULT_START_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_START_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_END_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_END_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private DelayStudentRepository delayStudentRepository;

    @Autowired
    private DelayStudentMapper delayStudentMapper;

    @Autowired
    private DelayStudentService delayStudentService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDelayStudentMockMvc;

    private DelayStudent delayStudent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DelayStudentResource delayStudentResource = new DelayStudentResource(delayStudentService);
        this.restDelayStudentMockMvc = MockMvcBuilders.standaloneSetup(delayStudentResource)
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
    public static DelayStudent createEntity(EntityManager em) {
        DelayStudent delayStudent = new DelayStudent()
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return delayStudent;
    }

    @Before
    public void initTest() {
        delayStudent = createEntity(em);
    }

    @Test
    @Transactional
    public void createDelayStudent() throws Exception {
        int databaseSizeBeforeCreate = delayStudentRepository.findAll().size();

        // Create the DelayStudent
        DelayStudentDTO delayStudentDTO = delayStudentMapper.toDto(delayStudent);
        restDelayStudentMockMvc.perform(post("/api/delay-students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delayStudentDTO)))
            .andExpect(status().isCreated());

        // Validate the DelayStudent in the database
        List<DelayStudent> delayStudentList = delayStudentRepository.findAll();
        assertThat(delayStudentList).hasSize(databaseSizeBeforeCreate + 1);
        DelayStudent testDelayStudent = delayStudentList.get(delayStudentList.size() - 1);
        assertThat(testDelayStudent.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testDelayStudent.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    public void createDelayStudentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = delayStudentRepository.findAll().size();

        // Create the DelayStudent with an existing ID
        delayStudent.setId(1L);
        DelayStudentDTO delayStudentDTO = delayStudentMapper.toDto(delayStudent);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDelayStudentMockMvc.perform(post("/api/delay-students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delayStudentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DelayStudent in the database
        List<DelayStudent> delayStudentList = delayStudentRepository.findAll();
        assertThat(delayStudentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = delayStudentRepository.findAll().size();
        // set the field null
        delayStudent.setStartDate(null);

        // Create the DelayStudent, which fails.
        DelayStudentDTO delayStudentDTO = delayStudentMapper.toDto(delayStudent);

        restDelayStudentMockMvc.perform(post("/api/delay-students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delayStudentDTO)))
            .andExpect(status().isBadRequest());

        List<DelayStudent> delayStudentList = delayStudentRepository.findAll();
        assertThat(delayStudentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = delayStudentRepository.findAll().size();
        // set the field null
        delayStudent.setEndDate(null);

        // Create the DelayStudent, which fails.
        DelayStudentDTO delayStudentDTO = delayStudentMapper.toDto(delayStudent);

        restDelayStudentMockMvc.perform(post("/api/delay-students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delayStudentDTO)))
            .andExpect(status().isBadRequest());

        List<DelayStudent> delayStudentList = delayStudentRepository.findAll();
        assertThat(delayStudentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDelayStudents() throws Exception {
        // Initialize the database
        delayStudentRepository.saveAndFlush(delayStudent);

        // Get all the delayStudentList
        restDelayStudentMockMvc.perform(get("/api/delay-students?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(delayStudent.getId().intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(sameInstant(DEFAULT_START_DATE))))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(sameInstant(DEFAULT_END_DATE))));
    }

    @Test
    @Transactional
    public void getDelayStudent() throws Exception {
        // Initialize the database
        delayStudentRepository.saveAndFlush(delayStudent);

        // Get the delayStudent
        restDelayStudentMockMvc.perform(get("/api/delay-students/{id}", delayStudent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(delayStudent.getId().intValue()))
            .andExpect(jsonPath("$.startDate").value(sameInstant(DEFAULT_START_DATE)))
            .andExpect(jsonPath("$.endDate").value(sameInstant(DEFAULT_END_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingDelayStudent() throws Exception {
        // Get the delayStudent
        restDelayStudentMockMvc.perform(get("/api/delay-students/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDelayStudent() throws Exception {
        // Initialize the database
        delayStudentRepository.saveAndFlush(delayStudent);
        int databaseSizeBeforeUpdate = delayStudentRepository.findAll().size();

        // Update the delayStudent
        DelayStudent updatedDelayStudent = delayStudentRepository.findOne(delayStudent.getId());
        // Disconnect from session so that the updates on updatedDelayStudent are not directly saved in db
        em.detach(updatedDelayStudent);
        updatedDelayStudent
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        DelayStudentDTO delayStudentDTO = delayStudentMapper.toDto(updatedDelayStudent);

        restDelayStudentMockMvc.perform(put("/api/delay-students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delayStudentDTO)))
            .andExpect(status().isOk());

        // Validate the DelayStudent in the database
        List<DelayStudent> delayStudentList = delayStudentRepository.findAll();
        assertThat(delayStudentList).hasSize(databaseSizeBeforeUpdate);
        DelayStudent testDelayStudent = delayStudentList.get(delayStudentList.size() - 1);
        assertThat(testDelayStudent.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testDelayStudent.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingDelayStudent() throws Exception {
        int databaseSizeBeforeUpdate = delayStudentRepository.findAll().size();

        // Create the DelayStudent
        DelayStudentDTO delayStudentDTO = delayStudentMapper.toDto(delayStudent);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDelayStudentMockMvc.perform(put("/api/delay-students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delayStudentDTO)))
            .andExpect(status().isCreated());

        // Validate the DelayStudent in the database
        List<DelayStudent> delayStudentList = delayStudentRepository.findAll();
        assertThat(delayStudentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDelayStudent() throws Exception {
        // Initialize the database
        delayStudentRepository.saveAndFlush(delayStudent);
        int databaseSizeBeforeDelete = delayStudentRepository.findAll().size();

        // Get the delayStudent
        restDelayStudentMockMvc.perform(delete("/api/delay-students/{id}", delayStudent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DelayStudent> delayStudentList = delayStudentRepository.findAll();
        assertThat(delayStudentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DelayStudent.class);
        DelayStudent delayStudent1 = new DelayStudent();
        delayStudent1.setId(1L);
        DelayStudent delayStudent2 = new DelayStudent();
        delayStudent2.setId(delayStudent1.getId());
        assertThat(delayStudent1).isEqualTo(delayStudent2);
        delayStudent2.setId(2L);
        assertThat(delayStudent1).isNotEqualTo(delayStudent2);
        delayStudent1.setId(null);
        assertThat(delayStudent1).isNotEqualTo(delayStudent2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DelayStudentDTO.class);
        DelayStudentDTO delayStudentDTO1 = new DelayStudentDTO();
        delayStudentDTO1.setId(1L);
        DelayStudentDTO delayStudentDTO2 = new DelayStudentDTO();
        assertThat(delayStudentDTO1).isNotEqualTo(delayStudentDTO2);
        delayStudentDTO2.setId(delayStudentDTO1.getId());
        assertThat(delayStudentDTO1).isEqualTo(delayStudentDTO2);
        delayStudentDTO2.setId(2L);
        assertThat(delayStudentDTO1).isNotEqualTo(delayStudentDTO2);
        delayStudentDTO1.setId(null);
        assertThat(delayStudentDTO1).isNotEqualTo(delayStudentDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(delayStudentMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(delayStudentMapper.fromId(null)).isNull();
    }
}
