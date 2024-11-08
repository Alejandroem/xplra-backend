'use client';

import { useEffect, useState } from 'react';
import { Adventure } from '@/lib/domain/models/adventures';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/SideBar';

export default function AdventuresPage() {
    const [adventures, setAdventures] = useState<Adventure[]>([]);
    const router = useRouter();

    // Fetch adventures when the page loads
    useEffect(() => {
        const fetchAdventures = async () => {
            const res = await fetch('/api/adventures');
            const data = await res.json();
            setAdventures(data);
        };

        fetchAdventures();
    }, []);

    // Handle delete adventure
    const handleDeleteAdventure = async (id: string) => {
        const res = await fetch(`/api/adventures/delete/${id}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            setAdventures(adventures.filter((adventure) => adventure.id !== id));
        }
    };

    // Redirect to create/update page
    const handleEditAdventure = (id: string) => {
        router.push(`/adventures/${id}`);
    };

    const handleCreateAdventure = () => {
        router.push('/adventures/create');
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container-fluid">
                <h1 className="mt-5">Adventures</h1>

                <button className="btn btn-primary mb-4" onClick={handleCreateAdventure}>
                    Create New Adventure
                </button>

                <div className="table-wrapper">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Short Description</th>
                                <th>Experience</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Image</th>
                                <th>Featured</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adventures.map((adventure) => (
                                <tr key={adventure.id}>
                                    <td>{adventure.title}</td>
                                    <td>{adventure.shortDescription}</td>
                                    <td>{adventure.experience}</td>
                                    <td>{adventure.latitude}</td>
                                    <td>{adventure.longitude}</td>
                                    <td>
                                        <img src={adventure.imageUrl} alt={adventure.title} width="80" />
                                    </td>
                                    <td>{adventure.featured ? 'Yes' : 'No'}</td>
                                    <td>
                                        <button
                                            className="btn btn-secondary btn-sm mx-2"
                                            onClick={() => handleEditAdventure(adventure.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteAdventure(adventure.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
