package advs.group1.mindmappingbackend.Service;

import advs.group1.mindmappingbackend.Model.Role;
import advs.group1.mindmappingbackend.Repository.UserRepository;
import advs.group1.mindmappingbackend.Request.AuthenticationRequest;
import advs.group1.mindmappingbackend.Request.RegisterRequest;
import advs.group1.mindmappingbackend.Response.AuthenticationResponse;
import advs.group1.mindmappingbackend.Model.User;

import advs.group1.mindmappingbackend.Response.RequestResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    //The main job of this component is to delegate the authenticate() call to the correct AuthenticationProvider DaoAuthenticationProvider
    private final AuthenticationManager authenticationManager;

    public RequestResponse register(RegisterRequest registerRequest){
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return RequestResponse.builder()
                    .message("User Email Already Exists with us")
                    .messageType("Error")
                    .build();
        }
        var user = User.builder()
                .firstname(registerRequest.getFirstname())
                .lastname(registerRequest.getLastname())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.USER)
                .build();
        System.out.println("REGISTER REQUEST "+user);
        userRepository.save(user);
        return RequestResponse.builder()
                .messageType("Success")
                .message("User Registered Successfully")
                .data(user)
                .build();
    }

    public  AuthenticationResponse authenticate(AuthenticationRequest authRequest){
        System.out.println("LOGIN Request"+authRequest);
        //UsernamePasswordAuthenticationToken is an implementation of the Authentication interface
        //which specifies that the user wants to authenticate using a username and password
        //authentication fails, then it throws an Authentication Exception
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getEmail(),
                        authRequest.getPassword()
                )
        );
        var user = userRepository.findByEmail(authRequest.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
