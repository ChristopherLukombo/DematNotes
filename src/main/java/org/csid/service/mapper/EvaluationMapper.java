package org.csid.service.mapper;

import org.csid.domain.*;
import org.csid.service.dto.EvaluationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Evaluation and its DTO EvaluationDTO.
 */
@Mapper(componentModel = "spring", uses = {StudentMapper.class, ModuleMapper.class, SchoolReportMapper.class})
public interface EvaluationMapper extends EntityMapper<EvaluationDTO, Evaluation> {

    @Mapping(source = "student.id", target = "studentId")
    @Mapping(source = "module.id", target = "moduleId")
    @Mapping(source = "schoolReport.id", target = "schoolReportId")
    EvaluationDTO toDto(Evaluation evaluation);

    @Mapping(source = "studentId", target = "student")
    @Mapping(source = "moduleId", target = "module")
    @Mapping(source = "schoolReportId", target = "schoolReport")
    Evaluation toEntity(EvaluationDTO evaluationDTO);

    default Evaluation fromId(Long id) {
        if (id == null) {
            return null;
        }
        Evaluation evaluation = new Evaluation();
        evaluation.setId(id);
        return evaluation;
    }
}
