package kz.javaee.codenames.repositories;

import kz.javaee.codenames.models.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface WordRepository extends JpaRepository<Word, Long> {
}
