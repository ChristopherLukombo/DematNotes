package org.csid.repository;

import java.util.List;

import org.csid.domain.InscriptionModule;
import org.csid.domain.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the InscriptionModule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InscriptionModuleRepository extends JpaRepository<InscriptionModule, Long> {
	
	public List<InscriptionModule> findAllByModule(Module module);
}
