package org.csid.web.rest;

import org.csid.DematNotesApp;

import org.csid.domain.AssignmentYearPeriod;
import org.csid.repository.AssignmentYearPeriodRepository;
import org.csid.service.AssignmentYearPeriodService;
import org.csid.service.dto.AssignmentYearPeriodDTO;
import org.csid.service.mapper.AssignmentYearPeriodMapper;
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
import java.util.List;

import static org.csid.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AssignmentYearPeriodResource REST controller.
 *
 * @see AssignmentYearPeriodResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DematNotesApp.class)
public class AssignmentYearPeriodResourceIntTest {

    @Autowired
    private AssignmentYearPeriodRepository assignmentYearPeriodRepository;

    @Autowired
    private AssignmentYearPeriodMapper assignmentYearPeriodMapper;

    @Autowired
    private AssignmentYearPeriodService assignmentYearPeriodService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAssignmentYearPeriodMockMvc;

    private AssignmentYearPeriod assignmentYearPeriod;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AssignmentYearPeriodResource assignmentYearPeriodResource = new AssignmentYearPeriodResource(assignmentYearPeriodService);
        this.restAssignmentYearPeriodMockMvc = MockMvcBuilders.standaloneSetup(assignmentYearPeriodResource)
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
    public static AssignmentYearPeriod createEntity(EntityManager em) {
        AssignmentYearPeriod assignmentYearPeriod = new AssignmentYearPeriod();
        return assignmentYearPeriod;
    }

    @Before
    public void initTest() {
        assignmentYearPeriod = createEntity(em);
    }

    @Test
    @Transactional
    public void createAssignmentYearPeriod() throws Exception {
        int databaseSizeBeforeCreate = assignmentYearPeriodRepository.findAll().size();

        // Create the AssignmentYearPeriod
        AssignmentYearPeriodDTO assignmentYearPeriodDTO = assignmentYearPeriodMapper.toDto(assignmentYearPeriod);
        restAssignmentYearPeriodMockMvc.perform(post("/api/assignment-year-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assignmentYearPeriodDTO)))
            .andExpect(status().isCreated());

        // Validate the AssignmentYearPeriod in the database
        List<AssignmentYearPeriod> assignmentYearPeriodList = assignmentYearPeriodRepository.findAll();
        assertThat(assignmentYearPeriodList).hasSize(databaseSizeBeforeCreate + 1);
        AssignmentYearPeriod testAssignmentYearPeriod = assignmentYearPeriodList.get(assignmentYearPeriodList.size() - 1);
    }

    @Test
    @Transactional
    public void createAssignmentYearPeriodWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = assignmentYearPeriodRepository.findAll().size();

        // Create the AssignmentYearPeriod with an existing ID
        assignmentYearPeriod.setId(1L);
        AssignmentYearPeriodDTO assignmentYearPeriodDTO = assignmentYearPeriodMapper.toDto(assignmentYearPeriod);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAssignmentYearPeriodMockMvc.perform(post("/api/assignment-year-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assignmentYearPeriodDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AssignmentYearPeriod in the database
        List<AssignmentYearPeriod> assignmentYearPeriodList = assignmentYearPeriodRepository.findAll();
        assertThat(assignmentYearPeriodList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAssignmentYearPeriods() throws Exception {
        // Initialize the database
        assignmentYearPeriodRepository.saveAndFlush(assignmentYearPeriod);

        // Get all the assignmentYearPeriodList
        restAssignmentYearPeriodMockMvc.perform(get("/api/assignment-year-periods?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(assignmentYearPeriod.getId().intValue())));
    }

    @Test
    @Transactional
    public void getAssignmentYearPeriod() throws Exception {
        // Initialize the database
        assignmentYearPeriodRepository.saveAndFlush(assignmentYearPeriod);

        // Get the assignmentYearPeriod
        restAssignmentYearPeriodMockMvc.perform(get("/api/assignment-year-periods/{id}", assignmentYearPeriod.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(assignmentYearPeriod.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAssignmentYearPeriod() throws Exception {
        // Get the assignmentYearPeriod
        restAssignmentYearPeriodMockMvc.perform(get("/api/assignment-year-periods/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAssignmentYearPeriod() throws Exception {
        // Initialize the database
        assignmentYearPeriodRepository.saveAndFlush(assignmentYearPeriod);
        int databaseSizeBeforeUpdate = assignmentYearPeriodRepository.findAll().size();

        // Update the assignmentYearPeriod
        AssignmentYearPeriod updatedAssignmentYearPeriod = assignmentYearPeriodRepository.findOne(assignmentYearPeriod.getId());
        // Disconnect from session so that the updates on updatedAssignmentYearPeriod are not directly saved in db
        em.detach(updatedAssignmentYearPeriod);
        AssignmentYearPeriodDTO assignmentYearPeriodDTO = assignmentYearPeriodMapper.toDto(updatedAssignmentYearPeriod);

        restAssignmentYearPeriodMockMvc.perform(put("/api/assignment-year-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assignmentYearPeriodDTO)))
            .andExpect(status().isOk());

        // Validate the AssignmentYearPeriod in the database
        List<AssignmentYearPeriod> assignmentYearPeriodList = assignmentYearPeriodRepository.findAll();
        assertThat(assignmentYearPeriodList).hasSize(databaseSizeBeforeUpdate);
        AssignmentYearPeriod testAssignmentYearPeriod = assignmentYearPeriodList.get(assignmentYearPeriodList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingAssignmentYearPeriod() throws Exception {
        int databaseSizeBeforeUpdate = assignmentYearPeriodRepository.findAll().size();

        // Create the AssignmentYearPeriod
        AssignmentYearPeriodDTO assignmentYearPeriodDTO = assignmentYearPeriodMapper.toDto(assignmentYearPeriod);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAssignmentYearPeriodMockMvc.perform(put("/api/assignment-year-periods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assignmentYearPeriodDTO)))
            .andExpect(status().isCreated());

        // Validate the AssignmentYearPeriod in the database
        List<AssignmentYearPeriod> assignmentYearPeriodList = assignmentYearPeriodRepository.findAll();
        assertThat(assignmentYearPeriodList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAssignmentYearPeriod() throws Exception {
        // Initialize the database
        assignmentYearPeriodRepository.saveAndFlush(assignmentYearPeriod);
        int databaseSizeBeforeDelete = assignmentYearPeriodRepository.findAll().size();

        // Get the assignmentYearPeriod
        restAssignmentYearPeriodMockMvc.perform(delete("/api/assignment-year-periods/{id}", assignmentYearPeriod.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AssignmentYearPeriod> assignmentYearPeriodList = assignmentYearPeriodRepository.findAll();
        assertThat(assignmentYearPeriodList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AssignmentYearPeriod.class);
        AssignmentYearPeriod assignmentYearPeriod1 = new AssignmentYearPeriod();
        assignmentYearPeriod1.setId(1L);
        AssignmentYearPeriod assignmentYearPeriod2 = new AssignmentYearPeriod();
        assignmentYearPeriod2.setId(assignmentYearPeriod1.getId());
        assertThat(assignmentYearPeriod1).isEqualTo(assignmentYearPeriod2);
        assignmentYearPeriod2.setId(2L);
        assertThat(assignmentYearPeriod1).isNotEqualTo(assignmentYearPeriod2);
        assignmentYearPeriod1.setId(null);
        assertThat(assignmentYearPeriod1).isNotEqualTo(assignmentYearPeriod2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AssignmentYearPeriodDTO.class);
        AssignmentYearPeriodDTO assignmentYearPeriodDTO1 = new AssignmentYearPeriodDTO();
        assignmentYearPeriodDTO1.setId(1L);
        AssignmentYearPeriodDTO assignmentYearPeriodDTO2 = new AssignmentYearPeriodDTO();
        assertThat(assignmentYearPeriodDTO1).isNotEqualTo(assignmentYearPeriodDTO2);
        assignmentYearPeriodDTO2.setId(assignmentYearPeriodDTO1.getId());
        assertThat(assignmentYearPeriodDTO1).isEqualTo(assignmentYearPeriodDTO2);
        assignmentYearPeriodDTO2.setId(2L);
        assertThat(assignmentYearPeriodDTO1).isNotEqualTo(assignmentYearPeriodDTO2);
        assignmentYearPeriodDTO1.setId(null);
        assertThat(assignmentYearPeriodDTO1).isNotEqualTo(assignmentYearPeriodDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(assignmentYearPeriodMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(assignmentYearPeriodMapper.fromId(null)).isNull();
    }
}
