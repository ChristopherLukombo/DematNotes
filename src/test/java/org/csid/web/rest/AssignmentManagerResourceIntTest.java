package org.csid.web.rest;

import org.csid.DematNotesApp;

import org.csid.domain.AssignmentManager;
import org.csid.repository.AssignmentManagerRepository;
import org.csid.service.AssignmentManagerService;
import org.csid.service.dto.AssignmentManagerDTO;
import org.csid.service.mapper.AssignmentManagerMapper;
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
 * Test class for the AssignmentManagerResource REST controller.
 *
 * @see AssignmentManagerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DematNotesApp.class)
public class AssignmentManagerResourceIntTest {

    @Autowired
    private AssignmentManagerRepository assignmentManagerRepository;

    @Autowired
    private AssignmentManagerMapper assignmentManagerMapper;

    @Autowired
    private AssignmentManagerService assignmentManagerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAssignmentManagerMockMvc;

    private AssignmentManager assignmentManager;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AssignmentManagerResource assignmentManagerResource = new AssignmentManagerResource(assignmentManagerService);
        this.restAssignmentManagerMockMvc = MockMvcBuilders.standaloneSetup(assignmentManagerResource)
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
    public static AssignmentManager createEntity(EntityManager em) {
        AssignmentManager assignmentManager = new AssignmentManager();
        return assignmentManager;
    }

    @Before
    public void initTest() {
        assignmentManager = createEntity(em);
    }

    @Test
    @Transactional
    public void createAssignmentManager() throws Exception {
        int databaseSizeBeforeCreate = assignmentManagerRepository.findAll().size();

        // Create the AssignmentManager
        AssignmentManagerDTO assignmentManagerDTO = assignmentManagerMapper.toDto(assignmentManager);
        restAssignmentManagerMockMvc.perform(post("/api/assignment-managers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assignmentManagerDTO)))
            .andExpect(status().isCreated());

        // Validate the AssignmentManager in the database
        List<AssignmentManager> assignmentManagerList = assignmentManagerRepository.findAll();
        assertThat(assignmentManagerList).hasSize(databaseSizeBeforeCreate + 1);
        AssignmentManager testAssignmentManager = assignmentManagerList.get(assignmentManagerList.size() - 1);
    }

    @Test
    @Transactional
    public void createAssignmentManagerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = assignmentManagerRepository.findAll().size();

        // Create the AssignmentManager with an existing ID
        assignmentManager.setId(1L);
        AssignmentManagerDTO assignmentManagerDTO = assignmentManagerMapper.toDto(assignmentManager);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAssignmentManagerMockMvc.perform(post("/api/assignment-managers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assignmentManagerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AssignmentManager in the database
        List<AssignmentManager> assignmentManagerList = assignmentManagerRepository.findAll();
        assertThat(assignmentManagerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAssignmentManagers() throws Exception {
        // Initialize the database
        assignmentManagerRepository.saveAndFlush(assignmentManager);

        // Get all the assignmentManagerList
        restAssignmentManagerMockMvc.perform(get("/api/assignment-managers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(assignmentManager.getId().intValue())));
    }

    @Test
    @Transactional
    public void getAssignmentManager() throws Exception {
        // Initialize the database
        assignmentManagerRepository.saveAndFlush(assignmentManager);

        // Get the assignmentManager
        restAssignmentManagerMockMvc.perform(get("/api/assignment-managers/{id}", assignmentManager.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(assignmentManager.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAssignmentManager() throws Exception {
        // Get the assignmentManager
        restAssignmentManagerMockMvc.perform(get("/api/assignment-managers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAssignmentManager() throws Exception {
        // Initialize the database
        assignmentManagerRepository.saveAndFlush(assignmentManager);
        int databaseSizeBeforeUpdate = assignmentManagerRepository.findAll().size();

        // Update the assignmentManager
        AssignmentManager updatedAssignmentManager = assignmentManagerRepository.findOne(assignmentManager.getId());
        // Disconnect from session so that the updates on updatedAssignmentManager are not directly saved in db
        em.detach(updatedAssignmentManager);
        AssignmentManagerDTO assignmentManagerDTO = assignmentManagerMapper.toDto(updatedAssignmentManager);

        restAssignmentManagerMockMvc.perform(put("/api/assignment-managers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assignmentManagerDTO)))
            .andExpect(status().isOk());

        // Validate the AssignmentManager in the database
        List<AssignmentManager> assignmentManagerList = assignmentManagerRepository.findAll();
        assertThat(assignmentManagerList).hasSize(databaseSizeBeforeUpdate);
        AssignmentManager testAssignmentManager = assignmentManagerList.get(assignmentManagerList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingAssignmentManager() throws Exception {
        int databaseSizeBeforeUpdate = assignmentManagerRepository.findAll().size();

        // Create the AssignmentManager
        AssignmentManagerDTO assignmentManagerDTO = assignmentManagerMapper.toDto(assignmentManager);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAssignmentManagerMockMvc.perform(put("/api/assignment-managers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assignmentManagerDTO)))
            .andExpect(status().isCreated());

        // Validate the AssignmentManager in the database
        List<AssignmentManager> assignmentManagerList = assignmentManagerRepository.findAll();
        assertThat(assignmentManagerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAssignmentManager() throws Exception {
        // Initialize the database
        assignmentManagerRepository.saveAndFlush(assignmentManager);
        int databaseSizeBeforeDelete = assignmentManagerRepository.findAll().size();

        // Get the assignmentManager
        restAssignmentManagerMockMvc.perform(delete("/api/assignment-managers/{id}", assignmentManager.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AssignmentManager> assignmentManagerList = assignmentManagerRepository.findAll();
        assertThat(assignmentManagerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AssignmentManager.class);
        AssignmentManager assignmentManager1 = new AssignmentManager();
        assignmentManager1.setId(1L);
        AssignmentManager assignmentManager2 = new AssignmentManager();
        assignmentManager2.setId(assignmentManager1.getId());
        assertThat(assignmentManager1).isEqualTo(assignmentManager2);
        assignmentManager2.setId(2L);
        assertThat(assignmentManager1).isNotEqualTo(assignmentManager2);
        assignmentManager1.setId(null);
        assertThat(assignmentManager1).isNotEqualTo(assignmentManager2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AssignmentManagerDTO.class);
        AssignmentManagerDTO assignmentManagerDTO1 = new AssignmentManagerDTO();
        assignmentManagerDTO1.setId(1L);
        AssignmentManagerDTO assignmentManagerDTO2 = new AssignmentManagerDTO();
        assertThat(assignmentManagerDTO1).isNotEqualTo(assignmentManagerDTO2);
        assignmentManagerDTO2.setId(assignmentManagerDTO1.getId());
        assertThat(assignmentManagerDTO1).isEqualTo(assignmentManagerDTO2);
        assignmentManagerDTO2.setId(2L);
        assertThat(assignmentManagerDTO1).isNotEqualTo(assignmentManagerDTO2);
        assignmentManagerDTO1.setId(null);
        assertThat(assignmentManagerDTO1).isNotEqualTo(assignmentManagerDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(assignmentManagerMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(assignmentManagerMapper.fromId(null)).isNull();
    }
}
