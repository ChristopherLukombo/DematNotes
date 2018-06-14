package org.csid.repository;

import org.csid.domain.Teacher;
import org.csid.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the Teacher entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    @Query("select teacher from Teacher teacher where teacher.user.login = ?#{principal.username}")
    List<Teacher> findByUserIsCurrentUser();

    Teacher findByUser(User user);

}
