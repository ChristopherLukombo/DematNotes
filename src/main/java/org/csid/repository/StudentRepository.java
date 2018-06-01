package org.csid.repository;

import java.util.List;

import org.csid.domain.SchoolYear;
import org.csid.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Student entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("select student from Student student where student.user.login = ?#{principal.username}")
    List<Student> findByUserIsCurrentUser();
    
    List<Student> findAllBySchoolYear(SchoolYear schoolYear);

}
