package org.csid.web.rest;

import org.csid.DematNotesApp;

import org.csid.domain.School;
import org.csid.repository.SchoolRepository;
import org.csid.service.SchoolService;
import org.csid.service.dto.SchoolDTO;
import org.csid.service.mapper.SchoolMapper;
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
 * Test class for the SchoolResource REST controller.
 *
 * @see SchoolResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DematNotesApp.class)
public class SchoolResourceIntTest {

    private static final String DEFAULT_WORDING = "AAAAAAAAAA";
    private static final String UPDATED_WORDING = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "7683700000";
    private static final String UPDATED_PHONE_NUMBER = "+910792720019";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_POSTAL_CODE = "26103";
    private static final String UPDATED_POSTAL_CODE = "68543";

    private static final String DEFAULT_SCHOOL_LEVEL = "AAAAAAAAAA";
    private static final String UPDATED_SCHOOL_LEVEL = "BBBBBBBBBB";

    @Autowired
    private SchoolRepository schoolRepository;

    @Autowired
    private SchoolMapper schoolMapper;

    @Autowired
    private SchoolService schoolService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSchoolMockMvc;

    private School school;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SchoolResource schoolResource = new SchoolResource(schoolService);
        this.restSchoolMockMvc = MockMvcBuilders.standaloneSetup(schoolResource)
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
    public static School createEntity(EntityManager em) {
        School school = new School()
            .wording(DEFAULT_WORDING)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .address(DEFAULT_ADDRESS)
            .city(DEFAULT_CITY)
            .postalCode(DEFAULT_POSTAL_CODE)
            .schoolLevel(DEFAULT_SCHOOL_LEVEL);
        return school;
    }

    @Before
    public void initTest() {
        school = createEntity(em);
    }

    @Test
    @Transactional
    public void createSchool() throws Exception {
        int databaseSizeBeforeCreate = schoolRepository.findAll().size();

        // Create the School
        SchoolDTO schoolDTO = schoolMapper.toDto(school);
        restSchoolMockMvc.perform(post("/api/schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolDTO)))
            .andExpect(status().isCreated());

        // Validate the School in the database
        List<School> schoolList = schoolRepository.findAll();
        assertThat(schoolList).hasSize(databaseSizeBeforeCreate + 1);
        School testSchool = schoolList.get(schoolList.size() - 1);
        assertThat(testSchool.getWording()).isEqualTo(DEFAULT_WORDING);
        assertThat(testSchool.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testSchool.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testSchool.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testSchool.getPostalCode()).isEqualTo(DEFAULT_POSTAL_CODE);
        assertThat(testSchool.getSchoolLevel()).isEqualTo(DEFAULT_SCHOOL_LEVEL);
    }

    @Test
    @Transactional
    public void createSchoolWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = schoolRepository.findAll().size();

        // Create the School with an existing ID
        school.setId(1L);
        SchoolDTO schoolDTO = schoolMapper.toDto(school);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSchoolMockMvc.perform(post("/api/schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolDTO)))
            .andExpect(status().isBadRequest());

        // Validate the School in the database
        List<School> schoolList = schoolRepository.findAll();
        assertThat(schoolList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkWordingIsRequired() throws Exception {
        int databaseSizeBeforeTest = schoolRepository.findAll().size();
        // set the field null
        school.setWording(null);

        // Create the School, which fails.
        SchoolDTO schoolDTO = schoolMapper.toDto(school);

        restSchoolMockMvc.perform(post("/api/schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolDTO)))
            .andExpect(status().isBadRequest());

        List<School> schoolList = schoolRepository.findAll();
        assertThat(schoolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPhoneNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = schoolRepository.findAll().size();
        // set the field null
        school.setPhoneNumber(null);

        // Create the School, which fails.
        SchoolDTO schoolDTO = schoolMapper.toDto(school);

        restSchoolMockMvc.perform(post("/api/schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolDTO)))
            .andExpect(status().isBadRequest());

        List<School> schoolList = schoolRepository.findAll();
        assertThat(schoolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = schoolRepository.findAll().size();
        // set the field null
        school.setAddress(null);

        // Create the School, which fails.
        SchoolDTO schoolDTO = schoolMapper.toDto(school);

        restSchoolMockMvc.perform(post("/api/schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolDTO)))
            .andExpect(status().isBadRequest());

        List<School> schoolList = schoolRepository.findAll();
        assertThat(schoolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCityIsRequired() throws Exception {
        int databaseSizeBeforeTest = schoolRepository.findAll().size();
        // set the field null
        school.setCity(null);

        // Create the School, which fails.
        SchoolDTO schoolDTO = schoolMapper.toDto(school);

        restSchoolMockMvc.perform(post("/api/schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolDTO)))
            .andExpect(status().isBadRequest());

        List<School> schoolList = schoolRepository.findAll();
        assertThat(schoolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPostalCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = schoolRepository.findAll().size();
        // set the field null
        school.setPostalCode(null);

        // Create the School, which fails.
        SchoolDTO schoolDTO = schoolMapper.toDto(school);

        restSchoolMockMvc.perform(post("/api/schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolDTO)))
            .andExpect(status().isBadRequest());

        List<School> schoolList = schoolRepository.findAll();
        assertThat(schoolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSchoolLevelIsRequired() throws Exception {
        int databaseSizeBeforeTest = schoolRepository.findAll().size();
        // set the field null
        school.setSchoolLevel(null);

        // Create the School, which fails.
        SchoolDTO schoolDTO = schoolMapper.toDto(school);

        restSchoolMockMvc.perform(post("/api/schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolDTO)))
            .andExpect(status().isBadRequest());

        List<School> schoolList = schoolRepository.findAll();
        assertThat(schoolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSchools() throws Exception {
        // Initialize the database
        schoolRepository.saveAndFlush(school);

        // Get all the schoolList
        restSchoolMockMvc.perform(get("/api/schools?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(school.getId().intValue())))
            .andExpect(jsonPath("$.[*].wording").value(hasItem(DEFAULT_WORDING.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE.toString())))
            .andExpect(jsonPath("$.[*].schoolLevel").value(hasItem(DEFAULT_SCHOOL_LEVEL.toString())));
    }

    @Test
    @Transactional
    public void getSchool() throws Exception {
        // Initialize the database
        schoolRepository.saveAndFlush(school);

        // Get the school
        restSchoolMockMvc.perform(get("/api/schools/{id}", school.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(school.getId().intValue()))
            .andExpect(jsonPath("$.wording").value(DEFAULT_WORDING.toString()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.postalCode").value(DEFAULT_POSTAL_CODE.toString()))
            .andExpect(jsonPath("$.schoolLevel").value(DEFAULT_SCHOOL_LEVEL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSchool() throws Exception {
        // Get the school
        restSchoolMockMvc.perform(get("/api/schools/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSchool() throws Exception {
        // Initialize the database
        schoolRepository.saveAndFlush(school);
        int databaseSizeBeforeUpdate = schoolRepository.findAll().size();

        // Update the school
        School updatedSchool = schoolRepository.findOne(school.getId());
        // Disconnect from session so that the updates on updatedSchool are not directly saved in db
        em.detach(updatedSchool);
        updatedSchool
            .wording(UPDATED_WORDING)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .address(UPDATED_ADDRESS)
            .city(UPDATED_CITY)
            .postalCode(UPDATED_POSTAL_CODE)
            .schoolLevel(UPDATED_SCHOOL_LEVEL);
        SchoolDTO schoolDTO = schoolMapper.toDto(updatedSchool);

        restSchoolMockMvc.perform(put("/api/schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolDTO)))
            .andExpect(status().isOk());

        // Validate the School in the database
        List<School> schoolList = schoolRepository.findAll();
        assertThat(schoolList).hasSize(databaseSizeBeforeUpdate);
        School testSchool = schoolList.get(schoolList.size() - 1);
        assertThat(testSchool.getWording()).isEqualTo(UPDATED_WORDING);
        assertThat(testSchool.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testSchool.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testSchool.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testSchool.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
        assertThat(testSchool.getSchoolLevel()).isEqualTo(UPDATED_SCHOOL_LEVEL);
    }

    @Test
    @Transactional
    public void updateNonExistingSchool() throws Exception {
        int databaseSizeBeforeUpdate = schoolRepository.findAll().size();

        // Create the School
        SchoolDTO schoolDTO = schoolMapper.toDto(school);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSchoolMockMvc.perform(put("/api/schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolDTO)))
            .andExpect(status().isCreated());

        // Validate the School in the database
        List<School> schoolList = schoolRepository.findAll();
        assertThat(schoolList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSchool() throws Exception {
        // Initialize the database
        schoolRepository.saveAndFlush(school);
        int databaseSizeBeforeDelete = schoolRepository.findAll().size();

        // Get the school
        restSchoolMockMvc.perform(delete("/api/schools/{id}", school.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<School> schoolList = schoolRepository.findAll();
        assertThat(schoolList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(School.class);
        School school1 = new School();
        school1.setId(1L);
        School school2 = new School();
        school2.setId(school1.getId());
        assertThat(school1).isEqualTo(school2);
        school2.setId(2L);
        assertThat(school1).isNotEqualTo(school2);
        school1.setId(null);
        assertThat(school1).isNotEqualTo(school2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SchoolDTO.class);
        SchoolDTO schoolDTO1 = new SchoolDTO();
        schoolDTO1.setId(1L);
        SchoolDTO schoolDTO2 = new SchoolDTO();
        assertThat(schoolDTO1).isNotEqualTo(schoolDTO2);
        schoolDTO2.setId(schoolDTO1.getId());
        assertThat(schoolDTO1).isEqualTo(schoolDTO2);
        schoolDTO2.setId(2L);
        assertThat(schoolDTO1).isNotEqualTo(schoolDTO2);
        schoolDTO1.setId(null);
        assertThat(schoolDTO1).isNotEqualTo(schoolDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(schoolMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(schoolMapper.fromId(null)).isNull();
    }
}
