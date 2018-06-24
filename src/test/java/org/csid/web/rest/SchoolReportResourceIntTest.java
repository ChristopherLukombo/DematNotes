package org.csid.web.rest;

import org.csid.DematNotesApp;

import org.csid.domain.SchoolReport;
import org.csid.repository.SchoolReportRepository;
import org.csid.service.SchoolReportService;
import org.csid.service.dto.SchoolReportDTO;
import org.csid.service.mapper.SchoolReportMapper;
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
 * Test class for the SchoolReportResource REST controller.
 *
 * @see SchoolReportResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DematNotesApp.class)
public class SchoolReportResourceIntTest {

    private static final String DEFAULT_GRADE_AWORD = "AAAAAAAAAA";
    private static final String UPDATED_GRADE_AWORD = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private SchoolReportRepository schoolReportRepository;

    @Autowired
    private SchoolReportMapper schoolReportMapper;

    @Autowired
    private SchoolReportService schoolReportService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSchoolReportMockMvc;

    private SchoolReport schoolReport;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SchoolReportResource schoolReportResource = new SchoolReportResource(schoolReportService);
        this.restSchoolReportMockMvc = MockMvcBuilders.standaloneSetup(schoolReportResource)
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
    public static SchoolReport createEntity(EntityManager em) {
        SchoolReport schoolReport = new SchoolReport()
            .gradeAword(DEFAULT_GRADE_AWORD)
            .comment(DEFAULT_COMMENT)
            .creationDate(DEFAULT_CREATION_DATE);
        return schoolReport;
    }

    @Before
    public void initTest() {
        schoolReport = createEntity(em);
    }

    @Test
    @Transactional
    public void createSchoolReport() throws Exception {
        int databaseSizeBeforeCreate = schoolReportRepository.findAll().size();

        // Create the SchoolReport
        SchoolReportDTO schoolReportDTO = schoolReportMapper.toDto(schoolReport);
        restSchoolReportMockMvc.perform(post("/api/school-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolReportDTO)))
            .andExpect(status().isCreated());

        // Validate the SchoolReport in the database
        List<SchoolReport> schoolReportList = schoolReportRepository.findAll();
        assertThat(schoolReportList).hasSize(databaseSizeBeforeCreate + 1);
        SchoolReport testSchoolReport = schoolReportList.get(schoolReportList.size() - 1);
        assertThat(testSchoolReport.getGradeAword()).isEqualTo(DEFAULT_GRADE_AWORD);
        assertThat(testSchoolReport.getComment()).isEqualTo(DEFAULT_COMMENT);
        assertThat(testSchoolReport.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
    }

    @Test
    @Transactional
    public void createSchoolReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = schoolReportRepository.findAll().size();

        // Create the SchoolReport with an existing ID
        schoolReport.setId(1L);
        SchoolReportDTO schoolReportDTO = schoolReportMapper.toDto(schoolReport);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSchoolReportMockMvc.perform(post("/api/school-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolReportDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SchoolReport in the database
        List<SchoolReport> schoolReportList = schoolReportRepository.findAll();
        assertThat(schoolReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSchoolReports() throws Exception {
        // Initialize the database
        schoolReportRepository.saveAndFlush(schoolReport);

        // Get all the schoolReportList
        restSchoolReportMockMvc.perform(get("/api/school-reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(schoolReport.getId().intValue())))
            .andExpect(jsonPath("$.[*].gradeAword").value(hasItem(DEFAULT_GRADE_AWORD.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())));
    }

    @Test
    @Transactional
    public void getSchoolReport() throws Exception {
        // Initialize the database
        schoolReportRepository.saveAndFlush(schoolReport);

        // Get the schoolReport
        restSchoolReportMockMvc.perform(get("/api/school-reports/{id}", schoolReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(schoolReport.getId().intValue()))
            .andExpect(jsonPath("$.gradeAword").value(DEFAULT_GRADE_AWORD.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSchoolReport() throws Exception {
        // Get the schoolReport
        restSchoolReportMockMvc.perform(get("/api/school-reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSchoolReport() throws Exception {
        // Initialize the database
        schoolReportRepository.saveAndFlush(schoolReport);
        int databaseSizeBeforeUpdate = schoolReportRepository.findAll().size();

        // Update the schoolReport
        SchoolReport updatedSchoolReport = schoolReportRepository.findOne(schoolReport.getId());
        // Disconnect from session so that the updates on updatedSchoolReport are not directly saved in db
        em.detach(updatedSchoolReport);
        updatedSchoolReport
            .gradeAword(UPDATED_GRADE_AWORD)
            .comment(UPDATED_COMMENT)
            .creationDate(UPDATED_CREATION_DATE);
        SchoolReportDTO schoolReportDTO = schoolReportMapper.toDto(updatedSchoolReport);

        restSchoolReportMockMvc.perform(put("/api/school-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolReportDTO)))
            .andExpect(status().isOk());

        // Validate the SchoolReport in the database
        List<SchoolReport> schoolReportList = schoolReportRepository.findAll();
        assertThat(schoolReportList).hasSize(databaseSizeBeforeUpdate);
        SchoolReport testSchoolReport = schoolReportList.get(schoolReportList.size() - 1);
        assertThat(testSchoolReport.getGradeAword()).isEqualTo(UPDATED_GRADE_AWORD);
        assertThat(testSchoolReport.getComment()).isEqualTo(UPDATED_COMMENT);
        assertThat(testSchoolReport.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingSchoolReport() throws Exception {
        int databaseSizeBeforeUpdate = schoolReportRepository.findAll().size();

        // Create the SchoolReport
        SchoolReportDTO schoolReportDTO = schoolReportMapper.toDto(schoolReport);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSchoolReportMockMvc.perform(put("/api/school-reports")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolReportDTO)))
            .andExpect(status().isCreated());

        // Validate the SchoolReport in the database
        List<SchoolReport> schoolReportList = schoolReportRepository.findAll();
        assertThat(schoolReportList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSchoolReport() throws Exception {
        // Initialize the database
        schoolReportRepository.saveAndFlush(schoolReport);
        int databaseSizeBeforeDelete = schoolReportRepository.findAll().size();

        // Get the schoolReport
        restSchoolReportMockMvc.perform(delete("/api/school-reports/{id}", schoolReport.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SchoolReport> schoolReportList = schoolReportRepository.findAll();
        assertThat(schoolReportList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SchoolReport.class);
        SchoolReport schoolReport1 = new SchoolReport();
        schoolReport1.setId(1L);
        SchoolReport schoolReport2 = new SchoolReport();
        schoolReport2.setId(schoolReport1.getId());
        assertThat(schoolReport1).isEqualTo(schoolReport2);
        schoolReport2.setId(2L);
        assertThat(schoolReport1).isNotEqualTo(schoolReport2);
        schoolReport1.setId(null);
        assertThat(schoolReport1).isNotEqualTo(schoolReport2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SchoolReportDTO.class);
        SchoolReportDTO schoolReportDTO1 = new SchoolReportDTO();
        schoolReportDTO1.setId(1L);
        SchoolReportDTO schoolReportDTO2 = new SchoolReportDTO();
        assertThat(schoolReportDTO1).isNotEqualTo(schoolReportDTO2);
        schoolReportDTO2.setId(schoolReportDTO1.getId());
        assertThat(schoolReportDTO1).isEqualTo(schoolReportDTO2);
        schoolReportDTO2.setId(2L);
        assertThat(schoolReportDTO1).isNotEqualTo(schoolReportDTO2);
        schoolReportDTO1.setId(null);
        assertThat(schoolReportDTO1).isNotEqualTo(schoolReportDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(schoolReportMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(schoolReportMapper.fromId(null)).isNull();
    }
}
