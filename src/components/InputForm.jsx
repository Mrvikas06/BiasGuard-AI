import { useState } from 'react';

const GENDERS = ['Male', 'Female', 'Other'];
const LOCATIONS = ['Urban', 'Rural'];
const EDUCATIONS = ['High School', 'Bachelors', 'Masters', 'PhD'];

export default function InputForm({ onSubmit }) {
    const [form, setForm] = useState({
        name: '', gender: 'Female', location: 'Rural', education: 'Bachelors', experience: 2,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: name === 'experience' ? parseInt(value) || 0 : value }));
    };

    const handleSubmit = (e) => { e.preventDefault(); onSubmit(form); };

    return (
        <form onSubmit={handleSubmit} className="card card-highlight p-6 anim-up">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(168,85,247,0.1)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="heading text-sm font-bold">Applicant Profile</h2>
                        <p style={{ fontSize: '0.6875rem', color: 'rgba(228,228,231,0.3)' }}>Enter data for audit</p>
                    </div>
                </div>
                <span className="tag tag-purple">NEW</span>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="label block mb-1.5">Full Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Alex Rivera" className="input-field" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="label block mb-1.5">Gender</label>
                        <select name="gender" value={form.gender} onChange={handleChange} className="input-field">
                            {GENDERS.map(g => <option key={g}>{g}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label block mb-1.5">Location</label>
                        <select name="location" value={form.location} onChange={handleChange} className="input-field">
                            {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="label block mb-1.5">Education</label>
                        <select name="education" value={form.education} onChange={handleChange} className="input-field">
                            {EDUCATIONS.map(e => <option key={e}>{e}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label block mb-1.5">Experience (yrs)</label>
                        <input type="number" name="experience" value={form.experience} onChange={handleChange} min="0" max="30" className="input-field" />
                    </div>
                </div>
            </div>

            <button type="submit" className="btn-primary w-full mt-6 py-3.5 flex items-center justify-center gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Run Bias Audit
            </button>

            <p style={{ fontSize: '0.5625rem', color: 'rgba(228,228,231,0.2)', textAlign: 'center', marginTop: 12 }}>Analysis takes ~2 seconds · No data stored</p>
        </form>
    );
}
