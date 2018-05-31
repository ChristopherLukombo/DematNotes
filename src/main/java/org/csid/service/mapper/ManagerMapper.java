package org.csid.service.mapper;

import org.csid.domain.*;
import org.csid.service.dto.ManagerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Manager and its DTO ManagerDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ManagerMapper extends EntityMapper<ManagerDTO, Manager> {

    @Mapping(source = "user.id", target = "userId")
    ManagerDTO toDto(Manager manager);

    @Mapping(source = "userId", target = "user")
    Manager toEntity(ManagerDTO managerDTO);

    default Manager fromId(Long id) {
        if (id == null) {
            return null;
        }
        Manager manager = new Manager();
        manager.setId(id);
        return manager;
    }
}
