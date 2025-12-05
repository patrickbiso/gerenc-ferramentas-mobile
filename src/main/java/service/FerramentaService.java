package com.example.gerencferramentas.service;

import com.example.gerencferramentas.exception.NotFoundException;
import com.example.gerencferramentas.model.Ferramenta;
import com.example.gerencferramentas.repository.FerramentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FerramentaService {

    @Autowired
    private FerramentaRepository ferramentaRepository;

    public List<Ferramenta> listarTodas() {
        return ferramentaRepository.findAll();
    }

    public Ferramenta salvar(Ferramenta ferramenta) {
        return ferramentaRepository.save(ferramenta);
    }

    public Ferramenta buscarPorId(Long id) {
        return ferramentaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Ferramenta não encontrada"));
    }

    public void excluir(Long id) {
        if (!ferramentaRepository.existsById(id)) {
            throw new NotFoundException("Ferramenta não encontrada");
        }
        ferramentaRepository.deleteById(id);
    }

    public List<Ferramenta> buscarPorNome(String nome) {
        return ferramentaRepository.findByNomeContainingIgnoreCase(nome);
    }
}

}
