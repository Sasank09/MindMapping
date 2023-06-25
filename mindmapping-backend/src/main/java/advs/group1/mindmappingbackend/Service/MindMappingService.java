package advs.group1.mindmappingbackend.Service;

import advs.group1.mindmappingbackend.Model.MindMapping;
import advs.group1.mindmappingbackend.Model.User;
import advs.group1.mindmappingbackend.Repository.MindMappingRepository;
import advs.group1.mindmappingbackend.Repository.UserRepository;
import advs.group1.mindmappingbackend.Request.MindMappingCreateRequest;
import advs.group1.mindmappingbackend.Request.MindMappingUpdateRequest;
import advs.group1.mindmappingbackend.Response.RequestResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MindMappingService {
    private final UserRepository userRepository;
    private final MindMappingRepository mindMappingRepository;


    public RequestResponse<?> getMindMapById(Integer mindMapId) {
        var mindMap = mindMappingRepository.findByMappingId(mindMapId);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName()).get();
        if(mindMap.isPresent() && mindMap.get().getUser().getUsername() == user.getUsername()){
            return RequestResponse.builder()
                    .messageType("Success")
                    .message("Record Retrieved Successfully")
                    .data(mindMap)
                    .build();
        }else {
            return RequestResponse.builder()
                    .messageType("Error")
                    .message("Error in Get Operation. Either you don't have access or Invalid ID")
                    .build();
        }
    }

    public RequestResponse<?> getAllMindMaps() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName()).get();
        List<Optional<MindMapping>> mindMappingList = mindMappingRepository.findByUserOrderByModifiedDateDesc(user);
        if(mindMappingList.size()==0) {
            return RequestResponse.builder()
                    .messageType("Success")
                    .message("No Records are available yet, Please create new to get started!")
                    .build();
        }else{
            return RequestResponse.builder()
                    .messageType("Success")
                    .message("All Records Retrieved Successfully")
                    .data(mindMappingList)
                    .build();
        }
    }

    public RequestResponse<?> createMindMap(MindMappingCreateRequest createRequest) {
        if(createRequest.getTitle()!=""&& createRequest.getMappingJSON()!=""){
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            User user = userRepository.findByEmail(auth.getName()).get();
            MindMapping mindMap = MindMapping.builder()
                    .mappingJSON(createRequest.getMappingJSON())
                    .title(createRequest.getTitle())
                    .user(user)
                    .build();
            MindMapping obj = mindMappingRepository.save(mindMap);
            mindMappingRepository.flush();
            return RequestResponse.builder()
                    .data(mindMappingRepository.findByMappingId(obj.getMappingId()))
                    .messageType("Success")
                    .message("Record Created Successfully")
                    .build();
        }else {
            return RequestResponse.builder()
                    .messageType("Error")
                    .message("Oops! Record Not Created, Something went wrong")
                    .data(createRequest)
                    .build();
        }
    }

    public RequestResponse<?> updateMindMap(Integer mindMapId, MindMappingUpdateRequest updateRequest) {
        var mindMap = mindMappingRepository.findByMappingId(mindMapId);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName()).get();
        if(mindMap.isPresent() && mindMap.get().getUser().getUsername() == user.getUsername()) {
            MindMapping updatedMindMap = MindMapping.builder()
                    .mappingId(mindMapId)
                    .mappingJSON(updateRequest.getMappingJSON())
                    .title(updateRequest.getTitle())
                    .createdDate(mindMap.get().getCreatedDate())
                    .user(user)
                    .build();
            System.out.println("UPDATE"+updatedMindMap);
            MindMapping obj = mindMappingRepository.save(updatedMindMap);
            mindMappingRepository.flush();
            return RequestResponse.builder()
                    .data(mindMappingRepository.findByMappingId(obj.getMappingId()))
                    .messageType("Success")
                    .message("Record Updated Successfully")
                    .build();
        }else {
            System.out.println("UPDATE FAILED:"+"Either you don't have access or Invalid ID");
            return RequestResponse.builder()
                    .messageType("Error")
                    .message("Error in Update Operation. Either you don't have access or Invalid ID")
                    .data(updateRequest)
                    .build();
        }
    }

    public RequestResponse<?> deleteMindMap(Integer mindMapId) {
        var mindMap = mindMappingRepository.findByMappingId(mindMapId);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName()).get();
        if(mindMap.isPresent() && mindMap.get().getUser().getUsername() == user.getUsername()) {
            MindMapping mindMapObj = mindMap.get();
            mindMappingRepository.delete(mindMapObj);
            return RequestResponse.builder()
                    .messageType("Success")
                    .message("Record Deleted Successfully")
                    .build();
        }else {
            return RequestResponse.builder()
                    .messageType("Error")
                    .message("Error in Delete Operation. Either you don't have access or Invalid ID")
                    .build();
        }
    }

}
