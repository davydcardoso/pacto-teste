package br.com.pacto.teste_backend.core.domain;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;

@Service
public class FormatHttpExeptions {
    public HashMap<String, Object> runException(Exception exception) {
        HashMap<String, Object> exceptionResult = new HashMap<>();

        exceptionResult.put("cause", exception.getCause());
        exceptionResult.put("message", exception.getMessage());
        exceptionResult.put("suppressed", (Arrays.stream(exception.getSuppressed()).toArray()));
        exceptionResult.put("localizedMessage", exception.getLocalizedMessage());

        return exceptionResult;
    }
}
