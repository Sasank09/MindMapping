package advs.group1.mindmappingbackend.Controller;

import advs.group1.mindmappingbackend.Request.MindMappingCreateRequest;
import advs.group1.mindmappingbackend.Request.MindMappingUpdateRequest;
import advs.group1.mindmappingbackend.Service.MindMappingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class MindMappingController {

    private final MindMappingService mindMappingService;

    @Transactional
    @CrossOrigin
    @GetMapping("/mindmappings")
    public ResponseEntity<?> getAllMindMaps() {
        return ResponseEntity.ok(mindMappingService.getAllMindMaps());
    }

    @GetMapping("/mindmappings/{id}")
    @CrossOrigin
    @Transactional
    public  ResponseEntity<?> getMindMapById(@Valid @PathVariable final String id) {
        return ResponseEntity.ok(mindMappingService.getMindMapById(Integer.valueOf(id)));
    }

    @PostMapping("/mindmapping/")
    @CrossOrigin
    @Transactional
    public  ResponseEntity<?> createMindMap(@RequestBody MindMappingCreateRequest newMindMap) {
        return ResponseEntity.ok(mindMappingService.createMindMap(newMindMap));
    }

    @PutMapping("/mindmappings/{id}")
    @CrossOrigin
    @Transactional
    public  ResponseEntity<?> updateMindMap(@Valid @PathVariable final Integer id, @RequestBody MindMappingUpdateRequest updateMindMap) {
        return ResponseEntity.ok(mindMappingService.updateMindMap(id,updateMindMap));
    }

    @DeleteMapping("/mindmappings/{id}")
    @CrossOrigin
    @Transactional
    public  ResponseEntity<?> deleteMindMap(@Valid @PathVariable final Integer id) {
        return ResponseEntity.ok(mindMappingService.deleteMindMap(id));
    }

}
