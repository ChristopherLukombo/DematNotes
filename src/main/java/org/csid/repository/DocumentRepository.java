package org.csid.repository;

import org.csid.domain.Document;
import org.csid.domain.Student;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Document entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

    List<Document>findAllByStudent(Student student);

}
