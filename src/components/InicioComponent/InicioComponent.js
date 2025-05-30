import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { ApiUri } from '../../utils/variables';
import { style } from './InicioComponentStyle';

// Componente para mostrar el proyecto en una tarjeta
const ProjectCard = ({ project }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <View style={style.card}>
      <Text style={style.cardTitle}>{project.nombre_proyecto}</Text>
      <Text
        style={[
          style.cardStatus,
          project.estado === 'En proceso' ? style.statusInProgress : style.statusCompleted,
        ]}
      >
        {project.estado}
      </Text>
      <View style={style.cardDetail}>
        <Text style={style.detailLabel}>Descripción:</Text>
        <Text style={style.detailValue}>{project.descripcion || 'N/A'}</Text>
      </View>
      <View style={style.cardDetail}>
        <Text style={style.detailLabel}>Fecha de Inicio:</Text>
        <Text style={style.detailValue}>{formatDate(project.fecha_inicio)}</Text>
      </View>
      <View style={style.cardDetail}>
        <Text style={style.detailLabel}>Fecha de Fin:</Text>
        <Text style={style.detailValue}>{formatDate(project.fecha_fin)}</Text>
      </View>
      <View style={style.cardDetail}>
        <Text style={style.detailLabel}>Institución:</Text>
        <Text style={style.detailValue}>
          {project.institucion ? project.institucion.nombre_institucion : 'N/A'}
        </Text>
      </View>
      <View style={style.cardDetail}>
        <Text style={style.detailLabel}>Coordinador:</Text>
        <Text style={style.detailValue}>
          {project.coordinador
            ? `${project.coordinador.nombre_coordinador} ${project.coordinador.apellido_coordinador}`
            : 'N/A'}
        </Text>
      </View>
    </View>
  );
};

export function InicioComponent() {
  const { token } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        if (!token) throw new Error('No estás autenticado');

        const response = await axios.get(`${ApiUri}/proyectos/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { message, data } = response.data;
        setMessage(message);
        setProjects(data);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            setMessage('Sesión expirada. Por favor, inicia sesión nuevamente.');
          } else if (error.response.status === 403) {
            setMessage('No tienes permisos para acceder a esta información');
          } else {
            setMessage(error.response.data.message || 'Error al cargar los proyectos');
          }
        } else {
          setMessage(error.message || 'No se pudo conectar con el servidor');
        }
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token]);

  if (loading) {
    return (
      <View style={style.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={style.scrollContainer}>
      <View style={style.container}>
        {projects.length === 0 ? (
          <Text style={style.message}>{message || 'No hay proyectos disponibles'}</Text>
        ) : (
          <>
            <Text style={style.header}>Servicio Social</Text>
            <ProjectCard project={projects[0]} />
          </>
        )}
      </View>
    </ScrollView>
  );
}
