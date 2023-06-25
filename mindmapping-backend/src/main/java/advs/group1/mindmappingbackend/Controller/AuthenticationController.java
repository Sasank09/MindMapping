package advs.group1.mindmappingbackend.Controller;

import advs.group1.mindmappingbackend.Request.AuthenticationRequest;
import advs.group1.mindmappingbackend.Request.RegisterRequest;
import advs.group1.mindmappingbackend.Response.AuthenticationResponse;
import advs.group1.mindmappingbackend.Response.RequestResponse;
import advs.group1.mindmappingbackend.Service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;

    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<RequestResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(authService.register(registerRequest));
    }

    @CrossOrigin
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@Valid @RequestBody AuthenticationRequest authRequest){
        return ResponseEntity.ok(authService.authenticate(authRequest));
    }

}
