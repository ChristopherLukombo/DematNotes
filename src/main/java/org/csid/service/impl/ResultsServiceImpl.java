package org.csid.service.impl;

import org.csid.domain.Evaluation;
import org.csid.domain.Student;
import org.csid.domain.User;
import org.csid.repository.EvaluationRepository;
import org.csid.repository.StudentRepository;
import org.csid.repository.UserRepository;
import org.csid.service.ResultsService;
import org.csid.service.dto.ResultsDTO;
import org.csid.service.mapper.ResultsMapper;
import org.csid.domain.non.persistant.Results;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;

@Service("ResultsService")
@Transactional
public class ResultsServiceImpl implements ResultsService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ResultsServiceImpl.class);

    @Autowired
    private EvaluationRepository evaluationRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResultsMapper resultsMapper;

    /**
     * Return the results of a student according to id
     * @param idUser to search
     * @return the list of entities
     */
    @Override
    public ResultsDTO getResults(final Long idUser) throws Exception {
        final ZonedDateTime dateTimePast = ZonedDateTime.now().minusYears(1L);

        final User user;
        final Student student;
        final List<Evaluation> evaluations;

        try {
            user = userRepository.findOne(idUser);
            student = studentRepository.findStudentByUser(user);
            evaluations = evaluationRepository.findEvaluationsByStudentAndPeriod(student.getId(), dateTimePast);

            final Results results = new Results(user, evaluations);

            return resultsMapper.mapToDTO(results);
        } catch (Exception e) {
            LOGGER.error("Error during collecting of results ", e);
            throw new Exception("Error during collecting of results");
        }
    }

}
