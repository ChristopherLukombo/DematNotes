package org.csid.web.rest;

import org.csid.DematNotesApp;

import org.csid.domain.AssignmentModule;
import org.csid.repository.AssignmentModuleRepository;
import org.csid.service.AssignmentModuleService;
import org.csid.service.dto.AssignmentModuleDTO;
import org.csid.service.mapper.AssignmentModuleMapper;
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
 * Test class for the AssignmentModuleResource REST controller.
 *
 * @see AssignmentModuleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DematNotesApp.class)
public class AssignmentModuleResourceIntTest {

    private static final Float DEFAULT_COEFFICIENT = 1F;
    private static final Float UPDATED_COEFFICIENT = 2F;

    @Autowired
    private AssignmentModuleRepository assignmentModuleRepository;

    @Autowired
    private AssignmentModuleMapper assignmentModuleMapper;

    @Autowired
    private AssignmentModuleService assignmentModuleService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAssignmentModuleMockMvc;

    private AssignmentModule assignmentModule;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AssignmentModuleResource assignmentModuleResource = new AssignmentModuleResource(assignmentModuleService);
        this.restAssignmentModuleMockMvc = MockMvcBuilders.standaloneSetup(assignmentModuleResource)
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
    public static AssignmentModule createEntity(EntityManager em) {
        AssignmentModule assignmentModule = new AssignmentModule()
            .coefficient(DEFAULT_COEFFICIENT);
        return assignmentModule;
    }

    @Before
    public void initTest() {
        assignmentModule = createEntity(em);
    }

    @Test
    @Transactional
    public void createAssignmentModule() throws Exception {
        int databaseSizeBeforeCreate = assignmentModuleRepository.findAll().size();

        // Create the AssignmentModule
        AssignmentModuleDTO assignmentModuleDTO = assignmentModuleMapper.toDto(assignmentModule);
        restAssignmentModuleMockMvc.perform(post("/api/assignment-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assignmentModuleDTO)))
            .andExpect(status().isCreated());

        // Validate the AssignmentModule in the database
        List<AssignmentModule> assignmentModuleList = assignmentModuleRepository.findAll();
        assertThat(assignmentModuleList).hasSize(databaseSizeBeforeCreate + 1);
        AssignmentModule testAssignmentModule = assignmentModuleList.get(assignmentModuleList.size() - 1);
        assertThat(testAssignmentModule.getCoefficient()).isEqualTo(DEFAULT_COEFFICIENT);
    }

    @Test
    @Transactional
    public void createAssignmentModuleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = assignmentModuleRepository.findAll().size();

        // Create the AssignmentModule with an existing ID
        assignmentModule.setId(1L);
        AssignmentModuleDTO assignmentModuleDTO = assignmentModuleMapper.toDto(assignmentModule);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAssignmentModuleMockMvc.perform(post("/api/assignment-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assignmentModuleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AssignmentModule in the database
        List<AssignmentModule> assignmentModuleList = assignmentModuleRepository.findAll();
        assertThat(assignmentModuleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAssignmentModules() throws Exception {
        // Initialize the database
        assignmentModuleRepository.saveAndFlush(assignmentModule);

        // Get all the assignmentModuleList
        restAssignmentModuleMockMvc.perform(get("/api/assignment-modules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(assignmentModule.getId().intValue())))
            .andExpect(jsonPath("$.[*].coefficient").value(hasItem(DEFAULT_COEFFICIENT.doubleValue())));
    }

    @Test
    @Transactional
    public void getAssignmentModule() throws Exception {
        // Initialize the database
        assignmentModuleRepository.saveAndFlush(assignmentModule);

        // Get the assignmentModule
        restAssignmentModuleMockMvc.perform(get("/api/assignment-modules/{id}", assignmentModule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(assignmentModule.getId().intValue()))
            .andExpect(jsonPath("$.coefficient").value(DEFAULT_COEFFICIENT.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAssignmentModule() throws Exception {
        // Get the assignmentModule
        restAssignmentModuleMockMvc.perform(get("/api/assignment-modules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAssignmentModule() throws Exception {
        // Initialize the database
        assignmentModuleRepository.saveAndFlush(assignmentModule);
        int databaseSizeBeforeUpdate = assignmentModuleRepository.findAll().size();

        // Update the assignmentModule
        AssignmentModule updatedAssignmentModule = assignmentModuleRepository.findOne(assignmentModule.getId());
        // Disconnect from session so that the updates on updatedAssignmentModule are not directly saved in db
        em.detach(updatedAssignmentModule);
        updatedAssignmentModule
            .coefficient(UPDATED_COEFFICIENT);
        AssignmentModuleDTO assignmentModuleDTO = assignmentModuleMapper.toDto(updatedAssignmentModule);

        restAssignmentModuleMockMvc.perform(put("/api/assignment-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assignmentModuleDTO)))
            .andExpect(status().isOk());

        // Validate the AssignmentModule in the database
        List<AssignmentModule> assignmentModuleList = assignmentModuleRepository.findAll();
        assertThat(assignmentModuleList).hasSize(databaseSizeBeforeUpdate);
        AssignmentModule testAssignmentModule = assignmentModuleList.get(assignmentModuleList.size() - 1);
        assertThat(testAssignmentModule.getCoefficient()).isEqualTo(UPDATED_COEFFICIENT);
    }

    @Test
    @Transactional
    public void updateNonExistingAssignmentModule() throws Exception {
        int databaseSizeBeforeUpdate = assignmentModuleRepository.findAll().size();

        // Create the AssignmentModule
        AssignmentModuleDTO assignmentModuleDTO = assignmentModuleMapper.toDto(assignmentModule);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAssignmentModuleMockMvc.perform(put("/api/assignment-modules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assignmentModuleDTO)))
            .andExpect(status().isCreated());

        // Validate the AssignmentModule in the database
        List<AssignmentModule> assignmentModuleList = assignmentModuleRepository.findAll();
        assertThat(assignmentModuleList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAssignmentModule() throws Exception {
        // Initialize the database
        assignmentModuleRepository.saveAndFlush(assignmentModule);
        int databaseSizeBeforeDelete = assignmentModuleRepository.findAll().size();

        // Get the assignmentModule
        restAssignmentModuleMockMvc.perform(delete("/api/assignment-modules/{id}", assignmentModule.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AssignmentModule> assignmentModuleList = assignmentModuleRepository.findAll();
        assertThat(assignmentModuleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AssignmentModule.class);
        AssignmentModule assignmentModule1 = new AssignmentModule();
        assignmentModule1.setId(1L);
        AssignmentModule assignmentModule2 = new AssignmentModule();
        assignmentModule2.setId(assignmentModule1.getId());
        assertThat(assignmentModule1).isEqualTo(assignmentModule2);
        assignmentModule2.setId(2L);
        assertThat(assignmentModule1).isNotEqualTo(assignmentModule2);
        assignmentModule1.setId(null);
        assertThat(assignmentModule1).isNotEqualTo(assignmentModule2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AssignmentModuleDTO.class);
        AssignmentModuleDTO assignmentModuleDTO1 = new AssignmentModuleDTO();
        assignmentModuleDTO1.setId(1L);
        AssignmentModuleDTO assignmentModuleDTO2 = new AssignmentModuleDTO();
        assertThat(assignmentModuleDTO1).isNotEqualTo(assignmentModuleDTO2);
        assignmentModuleDTO2.setId(assignmentModuleDTO1.getId());
        assertThat(assignmentModuleDTO1).isEqualTo(assignmentModuleDTO2);
        assignmentModuleDTO2.setId(2L);
        assertThat(assignmentModuleDTO1).isNotEqualTo(assignmentModuleDTO2);
        assignmentModuleDTO1.setId(null);
        assertThat(assignmentModuleDTO1).isNotEqualTo(assignmentModuleDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(assignmentModuleMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(assignmentModuleMapper.fromId(null)).isNull();
    }
}
