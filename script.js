// Data storage
let plans = [];
let progressEntries = [];

// Plan Registration
document.getElementById('plan-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('plan-name').value;
  const tags = document.getElementById('plan-tags').value.split(',').map(tag => tag.trim());
  const description = document.getElementById('plan-description').value;

  const plan = { name, tags, description };
  plans.push(plan);

  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.innerHTML = `<strong>${name}</strong>: ${description} <br><small>Tags: ${tags.join(', ')}</small>`;
  document.getElementById('plan-list').appendChild(li);

  this.reset();
});

// Progress Registration
document.getElementById('progress-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const date = document.getElementById('progress-date').value;
  const tags = document.getElementById('progress-tags').value.split(',').map(tag => tag.trim());
  const details = document.getElementById('progress-details').value;
  const imageInput = document.getElementById('progress-image');
  const image = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null;

  const progress = { date, tags, details, image };
  progressEntries.push(progress);

  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.innerHTML = `
    <strong>Date:</strong> ${date} <br>
    <strong>Tags:</strong> ${tags.join(', ')} <br>
    <strong>Details:</strong> ${details} <br>
    ${image ? `<img src="${image}" alt="Progress Image" class="img-thumbnail" style="max-width: 150px;">` : ''}
  `;
  document.getElementById('progress-list').appendChild(li);

  updateGraph();
  this.reset();
});

// Update Graph
function updateGraph() {
  const tagCounts = {};

  progressEntries.forEach(entry => {
    entry.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const ctx = document.getElementById('progress-chart').getContext('2d');
  const data = {
    labels: Object.keys(tagCounts),
    datasets: [
      {
        label: 'Progress by Tags',
        data: Object.values(tagCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Tags' } },
        y: { title: { display: true, text: 'Count' } },
      },
    },
  });
}
