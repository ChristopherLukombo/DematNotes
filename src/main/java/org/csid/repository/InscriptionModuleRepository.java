package org.csid.repository;

import org.csid.domain.InscriptionModule;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the InscriptionModule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InscriptionModuleRepository extends JpaRepository<InscriptionModule, Long> {

}
