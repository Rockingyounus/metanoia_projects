import React, { useState, useEffect } from 'react';
import './Todolist.css';
import { realtimeDb, auth } from '../Components/firebase'; 
import { ref, push, set, onValue,remove } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('');
  const [reminders, setReminders] = useState('');
  const [profile, setProfile] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskModalIsOpen, setTaskModalIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState('');
  const [projectModalIsOpen, setProjectModalIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const profileRef = ref(realtimeDb, `profiles/${user.uid}`);
        onValue(profileRef, (snapshot) => {
          const data = snapshot.val();
          setProfile(data || { name: 'No profile found' });
        });

        const tasksRef = ref(realtimeDb, 'tasks');
        onValue(tasksRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const parsedTasks = Object.keys(data)
              .filter((key) => data[key].userId === user.uid)
              .map((key) => ({
                id: key,
                ...data[key],
              }));
            setTasks(parsedTasks);
          } else {
            setTasks([]);
          }
        });

        const projectsRef = ref(realtimeDb, `projects/${user.uid}`);
        onValue(projectsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const parsedProjects = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }));
            setProjects(parsedProjects);
          } else {
            setProjects([]);
          }
        });
      } else {
        setProfile(null);
        setTasks([]);
        setProjects([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;

    const user = auth.currentUser;
    if (!user || !selectedProject) return;

    const tasksRef = ref(realtimeDb, 'tasks');
    const newTaskRef = push(tasksRef);

    await set(newTaskRef, {
      userId: user.uid,
      projectId: selectedProject.id,
      text: newTask,
      description: taskDescription,
      dueDate,
      assignee,
      priority,
      reminders,
      completed: false,
      date: new Date().toLocaleDateString(),
    });

    setNewTask('');
    setTaskDescription('');
    setDueDate('');
    setAssignee('');
    setPriority('');
    setReminders('');
    setModalIsOpen(false);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (newProject.trim() === '') return;

    const user = auth.currentUser;
    if (!user) return;

    const projectsRef = ref(realtimeDb, `projects/${user.uid}`);
    const newProjectRef = push(projectsRef);

    await set(newProjectRef, {
      name: newProject,
      date: new Date().toLocaleDateString(),
    });

    setNewProject('');
    setProjectModalIsOpen(false);
  };


  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    const projectRef = ref(realtimeDb, `projects/${projectId}`);
    await remove(projectRef);
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    const taskRef = ref(realtimeDb, `tasks/${taskId}`);
    await remove(taskRef);
  };

  const navigate = useNavigate();

  const handleArrangeMeetingsClick = () => {
    navigate('/Arrangemeeting');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openProjectModal = () => {
    setProjectModalIsOpen(true);
  };

  const closeProjectModal = () => {
    setProjectModalIsOpen(false);
  };

  const handleMenuClick = (menuItem) => {
    console.log(`Clicked on ${menuItem}`);
    
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setTaskModalIsOpen(true);
  };

  const closeTaskModal = () => {
    setTaskModalIsOpen(false);
    setSelectedTask(null);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    closeDropdown();
  };

 

  return (
    <div className="todo-list-container">
      <aside className="sidebar">
        {profile && (
          <div className="profile-container">
            <div
              className="profile-icon"
              onMouseEnter={toggleDropdown}
              onMouseLeave={closeDropdown}
            >
              <FontAwesomeIcon icon={faUser} />
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile">Profile</Link>
                  <Link to="/logout">Logout</Link>
                </div>
              )}
            </div>
            <p>{profile.username}</p>
          </div>
        )}
        <button className="add-task-button" onClick={selectedProject ? openModal : null}>
          <FontAwesomeIcon icon={faPlus} /> Add task
        </button>
        <div className="menu">
          <div className="menu-item" onClick={() => handleMenuClick('Inbox')}>Inbox</div>
          <div className="menu-item" onClick={() => handleMenuClick('Today')}>Today</div>
          <div className="menu-item" onClick={() => handleMenuClick('Upcoming')}>Upcoming</div>
          <div className="menu-item" onClick={() => handleMenuClick('Filters & Labels')}>Filters & Labels</div>
          <div className="projects">
            <div className="menu-item" onClick={openProjectModal}>My Projects</div>
            {projects.map((project) => (
              <div
                key={project.id}
                className={`menu-sub-item ${selectedProject && selectedProject.id === project.id ? 'selected' : ''}`}
                onClick={() => handleProjectClick(project)}
              >
                {project.name}
              </div>
            ))}
          </div>
        </div>
      </aside>
      <main className="main-content">
        <h1>{selectedProject ? selectedProject.name : 'Today'}</h1>
        <ul className="task-list">
          {tasks.filter((task) => selectedProject ? task.projectId === selectedProject.id : true).map((task) => (
            <li key={task.id} className="task-item" onClick={() => handleTaskClick(task)}>
              <div className="task-text">{task.text}</div>
              <div className="task-date">{task.date}</div>
              <FontAwesomeIcon
                icon={faTrash}
                className="delete-icon"
                onClick={() => handleDeleteTask(task.id)}
              />
            </li>
          ))}
        </ul>
      </main>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Task Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Add a new task</h2>
        <form onSubmit={handleAddTask} className="add-task-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Task name"
            className="add-task-input"
          />
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Description"
            className="add-task-textarea"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="Due date"
            className="add-task-input"
          />
          <input
            type="text"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            placeholder="Assignee"
            className="add-task-input"
          />
          <input
            type="text"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            placeholder="Priority"
            className="add-task-input"
          />
          <input
            type="text"
            value={reminders}
            onChange={(e) => setReminders(e.target.value)}
            placeholder="Reminders"
            className="add-task-input"
          />
          <button type="submit" className="add-task-button">Add Task</button>
        </form>
        <button onClick={closeModal} className="close-modal-button">Close</button>
      </Modal>
      <Modal
        isOpen={taskModalIsOpen}
        onRequestClose={closeTaskModal}
        contentLabel="Task Details Modal"
        className="modal"
        overlayClassName="overlay"
      >
        {selectedTask && (
          <>
            <h2>{selectedTask.text}</h2>
            <p><strong>Description:</strong> {selectedTask.description}</p>
            <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
            <p><strong>Assignee:</strong> {selectedTask.assignee}</p>
            <p><strong>Priority:</strong> {selectedTask.priority}</p>
            <p><strong>Reminders:</strong> {selectedTask.reminders}</p>
            <p><strong>Date Created:</strong> {selectedTask.date}</p>
            <p><strong>Completed:</strong> {selectedTask.completed ? 'Yes' : 'No'}</p>
            <button onClick={handleArrangeMeetingsClick}>Arrange meetings</button>
            <button onClick={closeTaskModal} className="close-modal-button">Close</button>
          </>
        )}
      </Modal>
      <Modal
        isOpen={projectModalIsOpen}
        onRequestClose={closeProjectModal}
        contentLabel="Add Project Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Add a new project</h2>
        <form onSubmit={handleAddProject} className="add-project-form">
          <input
            type="text"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            placeholder="Project name"
            className="add-project-input"
          />
          <button type="submit" className="add-project-button">Add Project</button>
        </form>
        <button onClick={closeProjectModal} className="close-modal-button">Close</button>
      </Modal>
    </div>
  );
};

export default TodoList;
