package org.csid.repository;

import org.csid.domain.Manager;
import org.csid.domain.User;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Manager entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ManagerRepository extends JpaRepository<Manager, Long> {

    @Query("select manager from Manager manager where manager.user.login = ?#{principal.username}")
    List<Manager> findByUserIsCurrentUser();

    Manager findByUser(User user);
}
