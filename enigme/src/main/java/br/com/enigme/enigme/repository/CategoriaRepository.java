package br.com.enigme.enigme.repository;

import br.com.enigme.enigme.entity.Categoria;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository  extends CrudRepository<Categoria, Long> {


}