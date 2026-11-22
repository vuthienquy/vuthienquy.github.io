let tasks = getJSON(STORAGE.tasks, null);
if (!tasks) {
  tasks = [];
  setJSON(STORAGE.tasks, tasks);
}

const defaultTaskNames = [
  'Hoàn thành báo cáo đồ án',
  'Làm bài tập JavaScript',
  'Đọc tài liệu CSS',
  'Chuẩn bị thuyết trình',
  'Kiểm tra responsive'
];

const filteredTasks = tasks.filter(task => !defaultTaskNames.includes(task.name));
if (filteredTasks.length !== tasks.length) {
  tasks = filteredTasks;
  setJSON(STORAGE.tasks, tasks);
}

let activeFilter = 'all';
const list = document.querySelector('#taskList');
const modal = document.querySelector('#taskModal');
const form = document.querySelector('#taskForm');

function renderTasks() {
  const search = document.querySelector('#searchInput').value.trim().toLowerCase();
  const visible = tasks.filter(task =>
    (activeFilter === 'all' || task.status === activeFilter) &&
    (task.name.toLowerCase().includes(search) || task.description.toLowerCase().includes(search))
  );
  if (!visible.length) {
    list.innerHTML = '<div class="task-card"><h3>Không tìm thấy công việc</h3><p>Thử thay đổi bộ lọc hoặc thêm công việc mới.</p></div>';
    return;
  }
  const statusName = {todo:'Chưa làm', doing:'Đang làm', done:'Hoàn thành'};
  list.innerHTML = visible.map(task => `
    <article class="task-card ${task.status === 'done' ? 'done' : ''}">
      <div class="task-card-top"><div><h3>${escapeHTML(task.name)}</h3><p>${escapeHTML(task.description || 'Không có mô tả')}</p></div><div class="task-actions">
        ${task.status !== 'done' ? `<button class="icon-btn" data-action="done" data-id="${task.id}" title="Hoàn thành">✓</button>` : ''}
        <button class="icon-btn" data-action="edit" data-id="${task.id}" title="Sửa">✎</button>
        <button class="icon-btn" data-action="delete" data-id="${task.id}" title="Xóa">×</button>
      </div></div>
      <div class="task-meta"><span class="badge ${task.priority}">${task.priority === 'high' ? 'Ưu tiên cao' : task.priority === 'medium' ? 'Ưu tiên vừa' : 'Ưu tiên thấp'}</span><span class="badge ${task.status}">${statusName[task.status]}</span><span class="badge">⌕ ${task.due}</span></div>
    </article>`).join('');
}

function openModal(task = null) {
  form.reset();
  document.querySelector('#taskId').value = task?.id || '';
  document.querySelector('#modalTitle').textContent = task ? 'Sửa công việc' : 'Thêm công việc';
  document.querySelector('#taskName').value = task?.name || '';
  document.querySelector('#taskDescription').value = task?.description || '';
  document.querySelector('#taskDue').value = task?.due || new Date().toISOString().slice(0, 10);
  document.querySelector('#taskStatus').value = task?.status || 'todo';
  document.querySelector('#taskPriority').value = task?.priority || 'medium';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.querySelector('#taskName').focus();
}

function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); }
function escapeHTML(value) { const div=document.createElement('div'); div.textContent=value; return div.innerHTML; }

document.querySelector('#openTaskModal').addEventListener('click', () => openModal());
document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.querySelector('#searchInput').addEventListener('input', renderTasks);
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  renderTasks();
}));

form.addEventListener('submit', event => {
  event.preventDefault();
  const id = document.querySelector('#taskId').value;
  const data = {
    id: id || crypto.randomUUID(),
    name: document.querySelector('#taskName').value.trim(),
    description: document.querySelector('#taskDescription').value.trim(),
    due: document.querySelector('#taskDue').value,
    status: document.querySelector('#taskStatus').value,
    priority: document.querySelector('#taskPriority').value
  };
  if (id) tasks = tasks.map(task => task.id === id ? data : task);
  else tasks.unshift(data);
  setJSON(STORAGE.tasks, tasks);
  closeModal();
  renderTasks();
  toast(id ? 'Đã cập nhật công việc' : 'Đã thêm công việc');
});

list.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const id = button.dataset.id;
  if (button.dataset.action === 'delete') {
    if (confirm('Bạn có chắc muốn xóa công việc này?')) {
      tasks = tasks.filter(task => task.id !== id);
      setJSON(STORAGE.tasks, tasks);
      renderTasks();
      toast('Đã xóa công việc');
    }
  } else if (button.dataset.action === 'edit') openModal(tasks.find(task => task.id === id));
  else if (button.dataset.action === 'done') {
    tasks = tasks.map(task => task.id === id ? {...task, status:'done'} : task);
    setJSON(STORAGE.tasks, tasks);
    renderTasks();
    toast('Công việc đã hoàn thành');
  }
});

renderTasks();
