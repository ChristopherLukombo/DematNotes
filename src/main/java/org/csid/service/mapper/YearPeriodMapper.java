package org.csid.service.mapper;

import org.csid.domain.*;
import org.csid.service.dto.YearPeriodDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity YearPeriod and its DTO YearPeriodDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface YearPeriodMapper extends EntityMapper<YearPeriodDTO, YearPeriod> {



    default YearPeriod fromId(Long id) {
        if (id == null) {
            return null;
        }
        YearPeriod yearPeriod = new YearPeriod();
        yearPeriod.setId(id);
        return yearPeriod;
    }
}
