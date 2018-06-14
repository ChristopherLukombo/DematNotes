package org.csid.repository;

import org.csid.domain.Intervention;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Intervention entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InterventionRepository extends JpaRepository<Intervention, Long> {
    @Query("select distinct intervention from Intervention intervention left join fetch intervention.teachers")
    List<Intervention> findAllWithEagerRelationships();

    @Query("select intervention from Intervention intervention left join fetch intervention.teachers where intervention.id =:id")
    Intervention findOneWithEagerRelationships(@Param("id") Long id);

}
