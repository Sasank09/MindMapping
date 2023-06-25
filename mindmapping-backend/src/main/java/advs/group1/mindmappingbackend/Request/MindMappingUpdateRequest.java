package advs.group1.mindmappingbackend.Request;

import advs.group1.mindmappingbackend.Model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MindMappingUpdateRequest {
    private Long mappingId;
    private String title;
    private String mappingJSON;
    private User user;
}
