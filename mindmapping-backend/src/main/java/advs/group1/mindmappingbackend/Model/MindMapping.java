package advs.group1.mindmappingbackend.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity // specifies that the class is an entity and is mapped to a database
@Table(name = "mindmappings")  //specifies the name of the database table to be used for mapping
public class MindMapping {
    @Id
    @Column(name = "mapping_Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer mappingId;

    @Column(name = "title", length = 255)
    private String title;

    @Column(name = "mapping_json", columnDefinition = "MEDIUMTEXT")
    private String mappingJSON;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "modified_date")
    private Date modifiedDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @PrePersist
    private void beforeSaving() {
        modifiedDate = new Date();
        createdDate = new Date();
    }

    @PreUpdate
    private void beforeUpdate(){
        createdDate =this.createdDate;
        modifiedDate = new Date();
    }

}
