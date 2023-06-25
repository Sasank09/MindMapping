package advs.group1.mindmappingbackend.Repository;

import advs.group1.mindmappingbackend.Model.MindMapping;
import advs.group1.mindmappingbackend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MindMappingRepository extends JpaRepository<MindMapping,Integer> {
    Optional<MindMapping> findByMappingId(Integer Id);
    List<Optional<MindMapping>> findByUserOrderByModifiedDateDesc(User user);
}
