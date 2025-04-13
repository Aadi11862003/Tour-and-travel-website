import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import { Container, Row, Col, Form, FormGroup, Input, Button, Table } from 'reactstrap';
import '../styles/admin.css';

const AdminPanel = () => {
  const [tours, setTours] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    city: '',
    address: '',
    distance: '',
    price: '',
    maxGroupSize: '',
    desc: '',
    photo: '',
    featured: false
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/tours`);
      setTours(res.data.data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`${BASE_URL}/tours/${editId}`, formData);
        alert('Tour updated successfully');
      } else {
        await axios.post(`${BASE_URL}/tours`, formData);
        alert('Tour added successfully');
      }
      fetchTours();
      setFormData({
        title: '',
        city: '',
        address: '',
        distance: '',
        price: '',
        maxGroupSize: '',
        desc: '',
        photo: '',
        featured: false
      });
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error('Error saving tour:', error);
    }
  };

  const handleEdit = (tour) => {
    setFormData(tour);
    setEditMode(true);
    setEditId(tour.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tours/${id}`);
      alert('Tour deleted successfully');
      fetchTours();
    } catch (error) {
      console.error('Error deleting tour:', error);
    }
  };

  return (
    <Container className="admin-section">
      <Row>
        <Col lg="6">
          <h2>{editMode ? 'Edit Tour' : 'Add Tour'}</h2>
          <Form onSubmit={handleSubmit} className="admin-form">
            <FormGroup>
              <Input type="text" id="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Input type="text" id="city" placeholder="City" value={formData.city} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Input type="text" id="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Input type="number" id="distance" placeholder="Distance" value={formData.distance} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Input type="number" id="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Input type="number" id="maxGroupSize" placeholder="Max Group Size" value={formData.maxGroupSize} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Input type="textarea" id="desc" placeholder="Description" value={formData.desc} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Input type="text" id="photo" placeholder="Photo URL" value={formData.photo} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Input type="checkbox" id="featured" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} /> Featured
            </FormGroup>
            <Button type="submit" className="admin-submit-btn">{editMode ? 'Update Tour' : 'Add Tour'}</Button>
          </Form>
        </Col>
        <Col lg="6">
          <h2>Manage Tours</h2>
          <Table bordered>
            <thead>
              <tr>
                <th>Title</th>
                <th>City</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => (
                <tr key={tour.id}>
                  <td>{tour.title}</td>
                  <td>{tour.city}</td>
                  <td>₹{tour.price}</td>
                  <td>
                    <Button color="warning" onClick={() => handleEdit(tour)}>Edit</Button>{' '}
                    <Button color="danger" onClick={() => handleDelete(tour.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;