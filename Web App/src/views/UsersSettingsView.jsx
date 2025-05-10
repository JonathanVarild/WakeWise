import React, { useState } from "react";
import { Key, UserPlus, Users, ChevronDown, ChevronUp, Trash2, Save } from "lucide-react";

export default function UsersSettingsView({
  currentUser,
  users,
  password,
  newUser,
  loading,
  passwordErrors,
  onPasswordChange,
  onNewUserChange,
  onCreateUser,
  onPasswordUpdate,
  onRoleUpdate,
  onDeleteUser,
}) {
  const [expanded, setExpanded] = useState({ 
    password: false, 
    newUser: false, 
    manageUsers: false 
  });

  const toggleSection = (section) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const Section = ({ icon: Icon, title, section, children }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
      <div 
        className="p-4 border-b border-gray-100 flex items-center gap-3 cursor-pointer hover:bg-gray-50"
        onClick={() => toggleSection(section)}
      >
        <Icon className="w-6 h-6 text-black" />
        <h2 className="text-lg font-semibold text-gray-800 flex-1">{title}</h2>
        {expanded[section] ? (
          <ChevronUp className="text-gray-600" />
        ) : (
          <ChevronDown className="text-gray-600" />
        )}
      </div>
      {expanded[section] && (
        <div className="p-4 space-y-4" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* change password */}
      <Section title="Change Password" icon={Key} section="password">
        <div className="space-y-4">
          {passwordErrors.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              {passwordErrors.map((error, index) => (
                <p key={index} className="text-red-600 text-sm flex items-center gap-2">
                  <span>•</span>{error}
                </p>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            <InputField
              label="Current Password"
              type="password"
              value={password.old}
              onChange={v => onPasswordChange("old", v)}
            />
            <InputField
              label="New Password"
              type="password"
              value={password.new}
              onChange={v => onPasswordChange("new", v)}
            />
            <InputField
              label="Confirm New Password"
              type="password"
              value={password.confirm}
              onChange={v => onPasswordChange("confirm", v)}
            />
          </div>

          <button
            onClick={onPasswordUpdate}
            className="w-full py-2.5 bg-black hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-sm"
          >
            Update Password
          </button>
        </div>
      </Section>

      {/* Create New User */}
      <Section title="Create New User" icon={UserPlus} section="newUser">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <InputField
              label="Username"
              value={newUser.username}
              onChange={v => onNewUserChange("username", v)}
            />
            <InputField
              label="Password"
              type="password"
              value={newUser.password}
              onChange={v => onNewUserChange("password", v)}
            />
            <SelectField
              label="Role"
              value={newUser.role}
              options={['user', 'admin']}
              onChange={v => onNewUserChange("role", v)}
            />
          </div>

          <button
            onClick={onCreateUser}
            className="w-full py-2.5 bg-black hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-sm"
>
            Create User
          </button>
        </div>
      </Section>

      {/* Manage Users */}
      <Section title="Manage Users" icon={Users} section="manageUsers">
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-4 text-gray-500">
              <span className="animate-pulse">Loading users...</span>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-4 text-gray-500 border rounded-lg bg-gray-50">
              No users found
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {users.map(user => (
                <div key={user.id} className="group hover:bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {user.username}
                          {user.id === currentUser?.id && (
                            <span className="ml-2 text-black text-sm font-normal">(Current User)</span>
                          )}
                        </p>
                        <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-32">
                        <SelectField
                          value={user.role}
                          options={['user', 'admin']}
                          onChange={v => onRoleUpdate(user.id, v)}
                          disabled={user.id === currentUser?.id}
                        />
                      </div>
                      <button 
                        onClick={() => onDeleteUser(user.id)}
                        className={`p-1.5 rounded-md ${
                          user.id === currentUser?.id 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-red-500 hover:bg-red-50 hover:text-red-600'
                        }`}
                        disabled={user.id === currentUser?.id}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}


const InputField = ({ label, type = 'text', value, onChange }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all"
    />
  </div>
);

const SelectField = ({ label, value, options, onChange, disabled }) => (
  <div className="space-y-1">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all ${
        disabled ? 'bg-gray-100 cursor-not-allowed opacity-75' : ''
      }`}
      disabled={disabled}
    >
      {options.map(option => (
        <option key={option} value={option} className="capitalize">{option}</option>
      ))}
    </select>
  </div>
);